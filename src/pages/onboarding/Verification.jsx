import React, { useEffect, useRef, useState } from "react";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useLocation, useNavigate } from "react-router";
import { PiSpinnerBold } from "react-icons/pi";
import { Button } from "../../components/global/GlobalButton";
import { emailVerificationValues } from "../../init/authentication/AuthValues";
import { useDispatch, useSelector } from "react-redux";
import {
  ResentOtp,
  resetAuthState,
  verifyEmail,
} from "../../redux/slices/auth.slice";

export default function Verification({ handleNext, email }) {
  const navigate = useNavigate();
  const { isLoading, error, userData, success, accessToken, isResendLoading } =
    useSelector((state) => state.auth); // Get loading, error, and user data from Redux
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const otpRefs = useRef([]);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(emailVerificationValues.otp);
  useEffect(() => {
    let interval;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  const handleResendClick = async () => {
    const data = { email: email };
    try {
      await dispatch(ResentOtp(data)).unwrap();
      SuccessToast("OTP resent successfully.");
      setIsResendDisabled(true);
      setTimer(60);
      setOtp(emailVerificationValues.otp);
    } catch (err) {
      console.error("Resend OTP failed:", err);
    }
  };

  const handleChange = (e, i) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value) && value !== "") return;

    const otpval = [...otp];
    if (value === "") {
      otpval[i] = "";
      setOtp(otpval);
      if (i > 0) {
        otpRefs.current[i - 1].focus();
      }
    } else {
      otpval[i] = value;
      setOtp(otpval);
      if (value && otpRefs.current[i + 1]) {
        otpRefs.current[i + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const updatedOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      updatedOtp[i] = pasted[i];
      if (otpRefs.current[i]) {
        otpRefs.current[i].value = pasted[i];
      }
    }

    setOtp(updatedOtp);
    const nextIndex = Math.min(pasted.length, 5);
    if (otpRefs.current[nextIndex]) {
      otpRefs.current[nextIndex].focus();
    }
  };

  const isOtpComplete = otp.join("").length < 5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const data = {
      email: email,
      otp: otpValue,
    };
    await dispatch(verifyEmail(data)).unwrap();
    handleNext();
  };
  useEffect(() => {
    dispatch(resetAuthState()); // reset success, error, and loading
    return () => dispatch(resetAuthState());
  }, [dispatch]);
  // useEffect for Error Toast
  useEffect(() => {
    if (error) {
      ErrorToast(error); // Show error toast if there's an error
      dispatch(resetAuthState()); // clear error after toast
    }
  }, [error]);

  return (
    <div className="w-auto flex flex-col items-center justify-center h-[90%]">
      <h3 className="font-[600] text-center text-[36px] text-[#181818]">
        Verification
      </h3>
      <p className="text-[#565656] mt-3 text-center font-[400] text-[16px] ">
        Please enter OTP code sent to {email}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="w-full bg-white px-4  mt-5  z-10 flex flex-col overflow-y-auto justify-center items-center gap-8"
      >
        <div className="">
          <div className="w-full h-auto flex justify-center items-center gap-2 my-2 flex-wrap">
            {otp.map((item, index) => (
              <input
                key={index}
                value={item}
                onChange={(e) => handleChange(e, index)}
                name="otp"
                className="flex-1 min-w-[50px] max-w-[80px] h-[80px] rounded-[16px] bg-transparent outline-none text-center border border-[#c2c6cb] text-3xl focus:bg-[#D0FCB333] focus-within:border-[#3C043A]"
                maxLength={1}
                onPaste={handlePaste}
                ref={(el) => (otpRefs.current[index] = el)} // Set ref for each input
              />
            ))}
          </div>

          <div className="w-full h-auto gap-10 mt-5 mb-5">
            <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center">
              <span className="text-[14px] font-medium text-[#565656]">
                Didn't receive a code?
              </span>
              <button
                type="button"
                className="outline-none text-[14px] flex items-center gap-2 border-none text-[#27A8E2] font-[600]"
                onClick={handleResendClick}
                disabled={isResendDisabled}
              >
                {isResendDisabled ? `Resend in ${timer}s` : "Resend now"}{" "}
                {isResendLoading && <PiSpinnerBold className="animate-spin" />}
              </button>
            </div>
            <div className="mt-5 w-[360px] mx-auto">
              <Button text={"Verify"} loading={isLoading} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

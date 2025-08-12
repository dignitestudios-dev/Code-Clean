import React, { useState, useEffect } from "react";
import { Button } from "../../components/global/GlobalButton";
import { useFormik } from "formik";
import { forgetPasswordValues } from "../../init/authentication/AuthValues";
import { forgetPasswordSchema } from "../../schema/authentication/AuthSchema";
import { verifyEmail, ResentOtp, clearforgetpasswordState } from "../../redux/slices/auth.slice"; // Import actions from Redux
import { useLogin } from "../../hooks/api/Post";
import Input from "../../components/global/Input";
import { LoginRight } from "../../assets/export";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToast } from "../../components/global/Toaster";

export default function Forget() {
  const { loading } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState("email"); // Step can be either 'email' or 'otp'
  const [resendTimer, setResendTimer] = useState(0); // Timer for OTP resend
  const { isResendSuccess, emailError, isResendLoading } = useSelector((state) => state.auth); // Retrieve email error state

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  // Formik initialization
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue, setFieldTouched } = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema: forgetPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (vals) => {
      if (step === "email") {
        // Step 1: Submit email and send OTP
        const payload = { email: vals.email };
        try {
          // Dispatch ResentOtp action to send OTP
          const response = await dispatch(ResentOtp(payload));

          // Check if the OTP was sent successfully
          if (response?.payload?.success || isResendSuccess) {
            setStep("otp"); // Proceed to OTP step
            setResendTimer(60); // Start OTP resend timer
            setFieldValue("otp", ""); // Clear OTP input
            setFieldTouched("otp", false, false); // Reset OTP touch state
            dispatch(clearforgetpasswordState()); // Reset the state for next use
          } else {
            // Handle failure case if OTP was not sent
            ErrorToast(emailError);
          }
        } catch (e) {
          // Handle errors during the OTP request (e.g., network failure)
          ErrorToast("An error occurred while sending OTP. Please try again.");
        }
      } else {
        // Step 2: Verify OTP
        const payload = { email: vals.email, otp: vals.otp };
        try {
          await dispatch(verifyEmail(payload)).unwrap(); // Verify OTP
          navigate("/auth/reset-password", { state: { email: vals.email } });
        } catch (e) {
          // Handle OTP verification errors (show toast or alert)
          ErrorToast("Invalid OTP. Please try again.");
        }
      }
    },
  });

  const handleResend = async () => {
    if (resendTimer > 0) return; // Prevent resend if timer is active
    try {
      await dispatch(ResentOtp({ email: values.email })); // Resend OTP
      setResendTimer(60); // Reset resend timer
    } catch (e) {
      // Handle error during OTP resend
      ErrorToast("An error occurred while resending OTP. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-2 gap-4 rounded-[19px] bg-white">
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e); // Trigger form submission
          }}
          className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
        >
          <div className="mt-2 w-full">
            <button
              type="button"
              className="mb-3"
              onClick={() => {
                if (step === "otp") {
                  setStep("email"); // Go back to email step
                  setFieldValue("otp", ""); // Clear OTP field
                } else {
                  navigate(-1); // Go back if not on OTP step
                }
              }}
            >
              <FaArrowLeft color="#181818" size={20} />
            </button>

            <h2 className="text-[36px] mb-2 capitalize font-[600] leading-[48px]">
              {step === "email" ? "Forgot Password" : "Enter OTP"}
            </h2>

            {step === "email" ? (
              <p className="text-[16px] font-normal text-left leading-[27px] text-[#3C3C43D9]">
                Please enter your registered email address.
              </p>
            ) : (
              <p className="text-[16px] font-normal leading-[27px] text-[#3C3C43D9]">
                We’ve sent a 6-digit code to <span className="font-semibold">{values.email}</span>. Enter it below to continue.
              </p>
            )}
          </div>

          {/* Step 1: Email */}
          {step === "email" && (
            <>
              <Input
                text={"Email Address"}
                name={"email"}
                type={"email"}
                holder={"Enter email address"}
                value={values.email}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.email}
                touched={touched?.email}
              />
              <Button text={"Send OTP"} loading={isResendLoading} />
            </>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <>
              {/* OTP input */}
              <Input
                text="OTP Code"
                name="otp"
                type="text"
                holder="Enter 6-digit code"
                value={values.otp}
                handleBlur={handleBlur}
                handleChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6); // Limit to 6 digits
                  setFieldValue("otp", onlyDigits);
                }}
                error={touched?.otp && (!values.otp ? "OTP is required" : values.otp.length !== 6 ? "Enter a valid 6-digit OTP" : "")}
                touched={touched?.otp}
              />

              <div className="w-full flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResend}
                  className={`text-sm underline ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>
              <Button text={"Verify OTP"} loading={isResendLoading} />
            </>
          )}
        </form>
      </div>

      <div
        className="p-4 rounded-[20px]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgba(39, 168, 226, 0.8) -20.45%, rgba(0, 3, 74,1) 124.53%), url(${LoginRight})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-end h-full ">
          <h3 className="text-white text-[52px] font-[600]">Connect. Book. Serve</h3>
          <p className="text-white capitalize text-[32px] font-[400]">
            Book top-rated experts or grow your business—all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

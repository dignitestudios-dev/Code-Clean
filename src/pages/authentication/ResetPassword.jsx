import React, { useState } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { LoginRight } from "../../assets/export";
import { useFormik } from "formik";
import { resetPasswordValues } from "../../init/authentication/AuthValues";
import { resetPasswordSchema } from "../../schema/authentication/AuthSchema";
import { useLogin } from "../../hooks/api/Post";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/auth.slice"; // Import resetPassword action
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

export default function ResetPassword() {
  const { loading } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { email } = location.state || {}; // Access the email passed via navigate
  
  const { resetpasswordLoading, resetpasswordSuccess, resetpasswordError } = useSelector((state) => state.auth);

  // Formik initialization
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: resetPasswordValues,
    validationSchema: resetPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      // Ensure both password fields match
      if (values.password === values.confirmPassword) {
        const payload = {
          email: email, // Use the email from the previous page
          password: values.password, 
          password_confirmation: values.confirmPassword,
        };
        
        try {
          // Dispatch resetPassword action
          await dispatch(resetPassword(payload));
          SuccessToast("Password reset successfully!");
          navigate("/auth/login"); // Redirect to login after successful reset
        } catch (error) {
          // Handle error, showing the error message
          ErrorToast("Password reset failed. Please try again.");
        }
      } else {
        ErrorToast("Passwords do not match.");
      }
    },
  });

  return (
    <div className="w-full h-screen grid grid-cols-2 gap-4 rounded-[19px] bg-white">
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <div className="text-center mt-2">
          <h2 className="text-[36px] capitalize mb-2 font-[600] leading-[48px]">
            Create New Password
          </h2>
          <p className="text-[16px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
            Enter new password to reset.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e); // Trigger form submission
          }}
          className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
        >
          <Input
            text={"Password"}
            name={"password"}
            type={"password"}
            holder={"Enter password here"}
            value={values.password}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.password}
            touched={touched?.password}
          />
          <Input
            text={"Confirm Password"}
            name={"confirmPassword"}
            type={"password"}
            holder={"Re-enter password here"}
            value={values.confirmPassword}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.confirmPassword}
            touched={touched?.confirmPassword}
          />
          <Button text={"Update"} loading={loading || resetpasswordLoading} />
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

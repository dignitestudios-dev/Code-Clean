import { useFormik } from "formik";
import React, { useState } from "react";
import { AppleImage, GoogleImage } from "../../assets/export";
import { Button } from "../global/GlobalButton";
import Input from "../../components/global/Input";
import {
  loginValues,
  SignUpValues,
} from "../../init/authentication/AuthValues";
import {
  signInSchema,
  signUpSchema,
} from "../../schema/authentication/AuthSchema";
import { useLogin } from "../../hooks/api/Post";
import { processLogin } from "../../lib/utils";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../../redux/slices/auth.slice";
import { ErrorToast } from "../global/Toaster";

export default function RegisterForm({ handleNext, setEmail }) {
  const state = useSelector((state) => state.auth);
  console.log(state, "state");
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: SignUpValues,
      validationSchema: signUpSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setEmail(values?.email);
        const data = {
          email: values?.email,
          password: values?.password,
          password_confirmation: values?.confirmPassword,
          role: "user",
        };

        try {
          // Await the Register dispatch and unwrap the result
          await dispatch(Register(data)).unwrap();

          // If success, go to the next step
          handleNext();

          // Optionally reset form
          action.resetForm();
        } catch (error) {
          // ErrorToast()
          // If register fails, show error (e.g., toast or log)
          console.log("Registration failed:", error);
        }
      },
    });

  return (
    <div className="w-auto flex flex-col justify-center h-[100%] ">
      <h3 className="font-[600] text-center text-[36px] text-[#181818]">
        SignUp
      </h3>
      <p className="text-[#565656] text-center font-[400] text-[16px] pt-2">
        Please enter your details to create an account.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="w-full mx-auto  md:w-[393px] mt-8 flex flex-col justify-start items-start gap-4"
      >
        <Input
          text={"email address"}
          name={"email"}
          type={"email"}
          holder={"chris.tom@gmail.com"}
          value={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.email}
          touched={touched?.email}
        />
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
          text={"Confirm password"}
          name={"confirmPassword"}
          type={"password"}
          holder={"Re-enter password here"}
          value={values.confirmPassword}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.confirmPassword}
          touched={touched?.confirmPassword}
        />

        <Button text={"Sign Up"} loading={state?.isLoading} />

        <div className="text-center w-full">
          <p className="font-[500] text-[12px] text-[#565656]">
            Already have an account?{" "}
            <span
              className="text-[#27A8E2] cursor-pointer"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Log In
            </span>
          </p>
          <p className="font-[500] mt-2 text-[12px] text-[#565656]">
            I accept the{" "}
            <NavLink to={""} className={"font-[600]"}>
              Terms & conditions
            </NavLink>{" "}
            and{" "}
            <NavLink className={"font-[600]"} to={""}>
              Privacy policy{" "}
            </NavLink>{" "}
          </p>
        </div>
        <div className="flex w-full items-center rounded-full">
          <div className="flex-1 border-b border-gray-350" />
          <span className="text-[#959393] text-[20px] font-normal leading-8 px-8 ">
            Or
          </span>
          <div className="flex-1 border-b border-gray-350" />
        </div>
        <div className="w-full">
          <button className="border flex items-center p-2 border-[#181818] rounded-full w-full ">
            <img src={GoogleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              {" "}
              Continue With Google
            </span>
          </button>
          <button className="border flex items-center mt-4 p-2 border-[#181818] rounded-full w-full ">
            <img src={AppleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              {" "}
              Continue With Apple
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useLogin } from "../../hooks/api/Post";
import { processLogin } from "../../lib/utils";
import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/AuthValues";
import { signInSchema } from "../../schema/authentication/AuthSchema";
import { NavLink } from "react-router";
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AppleImage, GoogleImage, LoginRight, Logo } from "../../assets/export";
import {Button} from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loading, postData } = useLogin();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.email,
          password: values?.password,
        };
        postData("/admin/login", false, null, data, processLogin);
      },
    });

  return (
    <div className="w-full h-auto grid grid-cols-2 gap-4 rounded-[19px] bg-white">
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <img src={Logo} alt="orange_logo" className="w-[148.4px]" />
        <div className="text-center mt-2">
          <h2 className="text-[36px] mb-2 font-[600] leading-[48px]">Log In</h2>
          <p className="text-[16px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
            Please enter your details to log in.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
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
            holder={"*****************"}
            value={values.password}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.password}
            touched={touched?.password}
          />

          <div className="w-full -mt-1  flex items-center justify-end">
            <NavLink
              to={"/auth/forgot-password"}
              className="text-[#0084FF] hover:no-underline text-[12px] font-normal leading-[20.4px]"
            >
              Forgot Password?
            </NavLink>
          </div>

          <Button text={"Log In"} loading={loading} />

          <div className="w-full  flex justify-center items-center">
            <span className="text-[12px] flex gap-1 font-[600] leading-[27px] text-[#959393]">
              Don’t have an account ?
              <NavLink
                className="font-medium hover:no-underline hover:text-[#0084FF] text-[#0084FF]"
                to={"/auth/signup"}
              >
                Sign Up
              </NavLink>
            </span>
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
          <h3 className="text-white text-[52px] font-[600]">
            Connect. Book. Serve
          </h3>
          <p className="text-white text-[32px] font-[400]">
            Book top-rated experts or grow your business—all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

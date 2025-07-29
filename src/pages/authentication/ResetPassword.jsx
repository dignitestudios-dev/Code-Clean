import React, { useState } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { LoginRight } from "../../assets/export";
import { useFormik } from "formik";
import { processLogin } from "../../lib/utils";
import { useLogin } from "../../hooks/api/Post";
import { resetPasswordValues } from "../../init/authentication/AuthValues";
import { resetPasswordSchema } from "../../schema/authentication/AuthSchema";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const { loading, postData } = useLogin();
  const navigate = useNavigate("");
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: resetPasswordValues,
      validationSchema: resetPasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.email,
          password: values?.password,
        };
        navigate("/auth/login");
        // postData("/admin/login", false, null, data, processLogin);
      },
    });

  return (
    <div className="w-full h-auto h-screen grid grid-cols-2 gap-4 rounded-[19px] bg-white">
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <div className="text-center mt-2">
          <h2 className="text-[36px] capitalize mb-2 font-[600] leading-[48px]">
            create new password
          </h2>
          <p className="text-[16px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
            Enter new password to reset.
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
          <Button text={"Update"} loading={loading} />
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
          <p className="text-white capitalize text-[32px] font-[400]">
            Book top-rated experts or grow your business—all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

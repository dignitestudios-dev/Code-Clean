import React from "react";
import {Button} from "../../components/global/GlobalButton";
import { useFormik } from "formik";
import { forgetPasswordValues} from "../../init/authentication/AuthValues";
import { forgetPasswordSchema, signInSchema } from "../../schema/authentication/AuthSchema";
import { processLogin } from "../../lib/utils";
import { useLogin } from "../../hooks/api/Post";
import Input from "../../components/global/Input";
import { LoginRight } from "../../assets/export";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Forget() {
  const { loading, postData } = useLogin();
  const navigate = useNavigate("");
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: forgetPasswordValues,
      validationSchema: forgetPasswordSchema,
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
    <div className="w-full  h-screen grid grid-cols-2 gap-4 rounded-[19px] bg-white">
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
        >
          <div className="mt-2">
            <button type="button" className="mb-3" onClick={() => navigate(-1)}>
              <FaArrowLeft color="#181818" size={20} /> 
            </button>
            <h2 className="text-[36px] mb-2 capitalize font-[600] leading-[48px]">
              forgot password
            </h2>
            <p className="text-[16px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
              Please enter your registered email address.
            </p>
          </div>
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
          <Button text={"Log In"} loading={loading} />
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
}

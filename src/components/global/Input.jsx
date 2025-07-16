import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PhoneNumberImage } from "../../assets/export";

export default function Input({
  text,
  name,
  type,
  holder,
  value,
  handleChange,
  handleBlur,
  error,
  touched,
}) {
  const [isPassVisible, setIsPassVisible] = useState(false);
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
      <label htmlFor="" className="font-[700] capitalize text-[12px]">
        {text}
      </label>
      <div
        className={`h-[49px] flex justify-start bg-[#FFFFFF] items-start w-full relative border-[0.8px]  border-[#D9D9D9] rounded-[8px] ${
          error && touched ? "border-red-500" : "border-[#D9D9D9]"
        }`}
      >
        {text == "Phone Number" && (
          <img src={PhoneNumberImage} className="w-[80px] h-[100%] ml-2" alt="PhoneNumberImage" />
        )}

        <input
          type={isPassVisible ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-[49px]  bg-transparent  outline-none border-0 rounded-[8px] placeholder:text-[#959393] text-[#262626] px-3 text-[16px] font-normal leading-[20.4px] ${
            error && touched ? "border-red-500" : "border-[#D9D9D9]"
          } `}
          placeholder={holder}
        />
        {type == "password" && (
          <button
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="w-[10%] h-full  rounded-r-[8px] bg-transparent text-md text-[#959393] flex items-center justify-center"
          >
            {isPassVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
      {error && touched ? (
        <p className="text-red-700 text-sm font-medium">{error}</p>
      ) : null}
    </div>
  );
}

import React from "react";
import { Button, LightButton } from "../../global/GlobalButton";

export default function Hero() {
  return (
    <div className="flex flex-col text-center gap-8 justify-center lg:w-[70%] mx-auto items-center h-[80%]">
      <h3 className="text-[#FFFFFF] font-[600] text-[25px] lg:text-[64px] leading-100 ">
        Find Services or Offer Your Expertise – The Choice is Yours!
      </h3>
      <p className="text-[#FFFFFF]">
        Connecting users with trusted service providers for seamless bookings
        and hassle-free <br /> experiences. Your All-in-One Service Marketplace
      </p>
      <div className="flex items-center flex-wrap lg:flex-nowrap gap-5 justify-center">
        <LightButton text={"Join as Service Provider"} />
        <Button text={"Become a User"} />
      </div>
    </div>
  );
}

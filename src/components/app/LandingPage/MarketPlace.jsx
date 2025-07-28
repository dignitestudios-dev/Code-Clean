import React from "react";
import { FaUser, FaStore, FaLongArrowAltRight } from "react-icons/fa";
import {
  MarketPlace,
  RightArrow,
  serviceMarket,
  userMarket,
} from "../../../assets/export";
import { NavLink } from "react-router";

const ServiceMarketplace = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 0.85) -20.45%, rgb(0, 3, 74, 0.85) 124.53%), url(${MarketPlace})`,
      }}
      className={`w-full bg-no-repeat bg-contain bg-left text-white py-[3em] px-6`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="capitalize tracking-wide text-[1em] mb-2">Our Services</p>
        <h2 className="text-4xl md:text-[2.8em] font-bold mb-4 pt-3">
          Your All-in-One Service Marketplace
        </h2>
        <p className="text-white/80 mb-10 max-w-3xl mx-auto">
          Easily connect with trusted professionals for seamless bookings and
          hassle-free experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:m-10 pt-6 gap-10 md:gap-10 md:px-10 md:mt-10">
          {/* For Users */}
          <div className="bg-white text-gray-800 rounded-[30px] shadow-lg px-4 text-center">
            <div className="flex items-center relative -top-8  flex-col ">
              <div className="bg-white  text-[#00034A] rounded-full">
                <img src={userMarket} className="w-[90px]" alt="userMarket" />
              </div>
              <h3 className="text-[32px] pt-3 bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent font-semibold">
                For Users
              </h3>
              <span className="mb-3 mt-0 text-[#181818] font-[400] text-[16px] ">
                {" "}
                Find Help Instantly!
              </span>
              <p className="mb-6 text-[#999999] font-[400] text-[16px] pl-10 pr-10">
                Browse verified professionals, book services with upfront
                pricing, and chat with providers before confirming. Enjoy secure
                payments and effortless scheduling for a stress-free experience.
              </p>
              <NavLink
                to={"/auth/role-selection"}
                className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent flex items-center gap-2 font-medium hover:underline"
              >
                <img src={RightArrow} className="w-[20px]" alt="" /> Let's Join
                Now
              </NavLink>
            </div>
          </div>

          {/* For Service Providers */}
          <div className="bg-white text-gray-800 rounded-[30px] shadow-lg px-4 text-center">
            <div className="flex items-center flex-col relative -top-8 ">
              <div className="bg-white text-[#00034A] rounded-full">
                <img
                  src={serviceMarket}
                  className="w-[90px]"
                  alt="serviceMarket"
                />
              </div>
              <h3 className="text-[32px] pt-3 bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent font-semibold ">
                For Service Providers
              </h3>
              <span className="mb-3 mt-0 text-[#181818] font-[400] text-[16px]">
                {" "}
                Grow Your Business!
              </span>
              <p className="mb-6 text-[#999999] font-[400] text-[16px] pl-10 pr-10">
                List your services, manage bookings effortlessly, and get paid
                securely. Connect with local clients using real-time geolocation
                and expand your reach with ease.
              </p>
              <NavLink
                to={"/auth/role-selection"}
                className=" bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent flex items-center gap-2 font-medium hover:underline"
              >
                <img src={RightArrow} className="w-[20px]" alt="" /> Let's Join
                Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMarketplace;

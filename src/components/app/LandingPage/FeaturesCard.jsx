import React from "react";
import { CalendarPic, UserToUser, verifyCard } from "../../../assets/export";

export default function FeaturesCard() {
  const cardData = [
    {
      title: "Smart Geolocation Matching",
      des: "Connect instantly with nearby service providers.",
      icon: UserToUser,
    },
    {
      title: "Instant Bookings",
      des: "Find and book services in just a few clicks.",
      icon: CalendarPic,
    },
    {
      title: "Secure Payments",
      des: "Enjoy safe transactions with our integrated wallet system.",
      icon: verifyCard,
    },
  ];
  return (
    <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 justify-center  px-20 w-full">
      {cardData?.map((item, i) => (
        <div
          key={i}
          className="shadow-sm flex items-center gap-4  rounded-[14px] justify-center bg-[#FFFFFF] p-5"
        >
          <img
            src={item?.icon}
            className="h-[60px] w-[60px]"
            alt={item?.icon}
          />
          <div>
            <h3 className="text-[18px] font-[600]">
              Smart Geolocation Matching
            </h3>
            <p className="text-[16px] font-[400] text-[#787878]">
              Connect instantly with nearby service providers.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

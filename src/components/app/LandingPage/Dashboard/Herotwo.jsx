import React from "react";
import { HeroBg } from "../../../../assets/export"; // Ensure this is the correct path
import { CiSearch } from "react-icons/ci";

export default function Herotwo() {
    return (
        <div
            className="flex bg-cover bg-center flex-col text-center gap-8 justify-center w-full mx-auto items-center -mt-[6em] pt-[10em] pb-[4em]"
            style={{
                backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
            }}
        >
            {/* Title Section */}
            <div className="w-[56em]">
                <h3 className="text-[#FFFFFF] font-semibold text-[64px] leading-[64px] text-shadow-xs">
                    Find Trusted Professionals for Your Needs
                </h3>
            </div>

            <p className="text-[#FFFFFF] font-[300] text-xl">
                Book verified service providers effortlessly and get quality service at your doorstep.
            </p>

            {/* Search Bar */}
            <div className="flex justify-center items-center p-3 rounded-[10px] bg-white/20 w-[40em] mt-0">
                <div className="relative w-[71%]">
                    <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />

                    <input
                        type="text"
                        className="w-full p-4 pl-12 rounded-[6px] bg-white/30 text-white placeholder:text-white shadow-md focus:outline-none"
                        placeholder="What service do you need?"
                    />
                </div>

                <button className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] px-6 py-3 rounded-[6px] text-white shadow-md hover:opacity-90 ml-3">
                    Find a service
                </button>
            </div>


        </div>
    );
}

import React from "react";
import { Button } from "../../global/GlobalButton";

export default function JoinAs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  px-10 lg:px-28 mt-10">
      <div
        className="flex flex-col items-center gap-5 justify-center rounded-[26px] lg:h-[350px] p-4"
        style={{
          background:
            " linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
        }}
      >
        <h3 className="text-white font-[700] text-[28px]">Become A User</h3>
        <p className="text-white font-[500] text-center text-[16px]">
          Your go-to platform for hassle-free home services. Join now to find
          and book trusted professionals effortlessly!
        </p>
        <button className="bg-white rounded-[8px] p-3 px-20  ">
          {" "}
          <span className="bg-gradient-to-r text-[16px] from-[#00034A] to-[#27A8E2] bg-clip-text text-transparents">
            {" "}
            Join Now{" "}
          </span>
        </button>
      </div>
      <div
        className="flex flex-col items-center gap-5 justify-center rounded-[26px] h-[350px] p-4"
        style={{
          background:
            " linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
        }}
      >
        <h3 className="text-white font-[700] text-[28px]">
          Join us as a Service Provider{" "}
        </h3>
        <p className="text-white font-[500] text-center text-[16px]">
          Join as a service provider, connect with clients, and grow your
          business—on your terms.
        </p>
        <button
          style={{
            background:
              "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
          }}
          className="rounded-[8px] p-3 px-20  "
        >
          {" "}
          <span className=" text-[16px] text-white bg-clip-text text-transparents">
            {" "}
            Join Now{" "}
          </span>
        </button>
      </div>
    </div>
  );
}

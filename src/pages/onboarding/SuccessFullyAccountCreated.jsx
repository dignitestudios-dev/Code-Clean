import React from "react";
import { SuccessIcon } from "../../assets/export";
import {Button} from "../../components/global/GlobalButton";

export default function SuccessFullyAccountCreated() {
  return (
    <div className="w-full  h-screen justify-center grid grid-cols-1 gap-4 rounded-[19px] bg-white">
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <img src={SuccessIcon} className="w-20 h-20 " alt="mail-img" />
          <h3 className="capitalize  text-[36px] text-[#181818] font-[600]">
            Account Created
          </h3>
          <p className="text-[16px] font-[400] text-[#565656]">
            Your profile has been created successfully.
          </p>
          <Button text={"Explore Services"} />
        </div>
      </div>    
    </div>
  );
}

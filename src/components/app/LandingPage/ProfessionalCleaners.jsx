import React from "react";
import ProfessionalCleanersSlider from "./ProfessionalCleanersSlider";
export default function ProfessionalCleaners() {
  return (
    <section id="cleaners" className="px-5 lg:px-20 bg-[#F5FCFF] py-4 w-full mt-10">
      <div className="text-center">
        <h3 className="text-[48px]  font-[700] text-[#181818] ">
          Hire Professional <span className="text-[#26A7E2]"> Cleaners </span>{" "}
        </h3>
        <p className="text-[#565656] text-[18px]  font-[400]">
          Find experienced and trusted cleaners near you for hassle-free
          service.
        </p>
      </div>
      <ProfessionalCleanersSlider />
    </section>
  );
}

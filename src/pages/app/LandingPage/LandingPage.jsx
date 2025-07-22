import React from "react";
import FeaturesCard from "../../../components/app/LandingPage/FeaturesCard";
import ProfessionalCleaners from "../../../components/app/LandingPage/ProfessionalCleaners";
import ChooseUs from "../../../components/app/LandingPage/ChooseUs";
import ServiceMarketplace from "../../../components/app/LandingPage/MarketPlace";
import Faq from "../../../components/app/LandingPage/Faq";
import JoinAs from "../../../components/app/LandingPage/JoinAs";
import Navbar from "../../../components/layout/Navbar";
import Hero from "../../../components/app/LandingPage/Hero";
import { HeroBg } from "../../../assets/export";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[13em] pb-[10em]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <Hero />
      </div>
      <FeaturesCard />
      <ProfessionalCleaners />
      <ChooseUs />
      <ServiceMarketplace />
      <Faq />
      <JoinAs />
    </div>
  );
}

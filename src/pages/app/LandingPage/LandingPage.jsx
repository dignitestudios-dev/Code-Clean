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
      <div className="relative -mt-[6em] pt-[13em] pb-[10em]">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: `linear-gradient(234.85deg, rgba(39,168,226,0.85) -20.45%, rgba(0,3,74,0.85) 124.53%), url(${HeroBg})`,
            zIndex: -1,
          }}
        />
        <div className="relative  flex items-center">
          <Hero />
        </div>
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

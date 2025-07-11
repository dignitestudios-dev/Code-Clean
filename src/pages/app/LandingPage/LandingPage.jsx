import React from "react";
import FeaturesCard from "../../../components/app/LandingPage/FeaturesCard";
import ProfessionalCleaners from "../../../components/app/LandingPage/ProfessionalCleaners";
import ChooseUs from "../../../components/app/LandingPage/ChooseUs";
import ServiceMarketplace from "../../../components/app/LandingPage/MarketPlace";
import Faq from "../../../components/app/LandingPage/Faq";
import JoinAs from "../../../components/app/LandingPage/JoinAs";

export default function LandingPage() {
  return (
    <div >
      <FeaturesCard />
      <ProfessionalCleaners />
      <ChooseUs/>
      <ServiceMarketplace/>
      <Faq/>
      <JoinAs/>
    </div>
  );
}

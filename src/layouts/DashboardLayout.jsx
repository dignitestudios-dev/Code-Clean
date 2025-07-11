import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { HeroBg, NoInternetImage } from "../assets/export";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/app/LandingPage/Hero";
import Footer from "../components/layout/Footer";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      // Handle no internet connection
      setOpenNoInternet(true);
    }
  }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-start items-start">
      <div
        className="relative w-full h-screen bg-no-repeat bg-cover  bg-center"
      >
      </div>

      <img src={NoInternetImage} alt="" className="hidden" />
      <div className="w-full h-screen flex justify-start items-start">
        <div className=" h-[calc(100%-2.5rem)] w-full">
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

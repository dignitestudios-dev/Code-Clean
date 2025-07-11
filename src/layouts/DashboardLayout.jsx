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
    <div className="w-full h-[100vh] flex flex-col justify-start items-start">
      <div
        className="relative w-full h-[400%] bg-no-repeat bg-cover  bg-center"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        <div className="relative h-[84%] z-10 px-20 ">
          <Navbar />
          <Hero />
        </div>
      </div>

      <img src={NoInternetImage} alt="" className="hidden" />
      <div className="w-full h-screen flex justify-start items-start">
        <div className="w-[calc(100%-15rem)] h-[calc(100%-2.5rem)] p-4 px-20 ">
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

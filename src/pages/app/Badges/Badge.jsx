import React, { useEffect, useState } from "react";
import {
  CupIcon,
  FifthYear,
  FourthYear,
  HeroBg,
  LockDarkIcon,
  LockIcon,
  OneHalf,
  OneYear,
  SixMonth,
  ThreeMonth,
  ThreeYear,
  TickIcon,
  TwoYear,
} from "../../../assets/export";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../../../components/layout/Navbar";
import BadgeModal from "../../../components/app/Badge/BadgeModal";
import Footer from "../../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getBadges } from "../../../redux/slices/provider.slice";

export default function Badge() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  const dispatch = useDispatch();
  const { badges } = useSelector((state) => state.provider);
  useEffect(() => {
    dispatch(getBadges());
  }, []);
  console.log(badges, "badges");

  return (
    <>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="px-10 lg:px-40  -mt-80 bottom-0 items-center gap-3 ">
        <h3 className="font-semibold text-[#FFFFFF]  text-[32px]">Badges</h3>
        <div className="bg-white  shadow-lg mb-48 rounded-[8px] p-10 mt-3">
          {/* Badges You've Earned */}
          <h3 className="flex items-center gap-2 text-[#000000] font-[700] text-[24px]">
            <img src={CupIcon} className="w-4" alt="CupIcon" /> Badges You've
            Earned
          </h3>
          <div className="mt-8 grid gap-3 grid-cols-3">
            {badges?.alloted_badges?.length > 0 ? (
              badges.alloted_badges.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    setCurrentDetail(item);
                    setIsOpen(!isOpen);
                  }}
                >
                  <div className="w-[140px] h-[100px] rounded-[50%] border-2 border-[#D18537]">
                    <img
                      src={import.meta.env.VITE_APP_AWS_URL + item?.icon}
                      className="w-20 mx-auto mt-3"
                      alt="CupIcon"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <h3 className="text-[#000000] flex items-center gap-1 text-[18px] font-bold">
                      {item?.name} <img src={TickIcon} className="w-4" alt="" />
                    </h3>
                    <p className="text-[12px] font-[500] text-[#00000075]">
                      {item?.bio}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No badges found.</p>
            )}
          </div>

          {/* Badges You Can Still Earn */}
          <h3 className="flex items-center mt-40 gap-2 text-[#000000] font-[700] text-[24px]">
            <img src={LockIcon} className="w-4" alt="CupIcon" /> Badges You Can
            Still Earn
          </h3>
          <div className="mt-8 grid gap-3 gap-y-6 grid-cols-3">
            {badges?.remaining_badges?.length > 0 ? (
              badges.remaining_badges.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-[140px] h-[100px] rounded-[50%] border-2 border-[#8f9090] border-dashed">
                    <img
                      src={import.meta.env.VITE_APP_AWS_URL + item?.url}
                      className="w-20 mx-auto mt-3 grayscale"
                      alt="CupIcon"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <h3 className="text-[#000000] flex items-center gap-1 text-[18px] font-bold">
                      {item?.name}{" "}
                      <img src={LockDarkIcon} className="w-4" alt="" />
                    </h3>
                    <p className="text-[12px] font-[500] text-[#00000075]">
                      {item?.bio}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No badges found.</p>
            )}
          </div>
        </div>
      </div>
      <BadgeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        detail={currentDetail}
      />
    </>
  );
}

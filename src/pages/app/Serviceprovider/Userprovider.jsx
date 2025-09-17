import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../../components/layout/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { HeroBg, usertwo } from "../../../assets/export";
import { useLocation, useNavigate } from "react-router";
import Reportuser from "../../../components/Serviceprovider/Reportuser";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/slices/provider.slice";

const UserProvider = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const [isReport, setIsReport] = useState(false);
  const loc = useLocation();
  const dispatch = useDispatch();
  const { getUserProfileDetail } = useSelector((state) => state?.provider);
  console.log(loc?.state?.user, "testing");
  // useEffect(() => {
  //   // dispatch(getUserProfile(loc?.state?.id));
  // }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar type="serviceprovider" />

      {/* Hero Section */}
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgba(39,168,226,1) -20.45%, rgba(0,3,74,0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex items-center gap-3 ml-[8em]">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={20} />
          </button>
          <h2 className="text-white text-[30px] font-bold leading-[48px] capitalize">
            User Provider
          </h2>
        </div>
      </div>

      {/* Card Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl -mt-[16em] relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <img
              src={import.meta.env.VITE_APP_AWS_URL+loc?.state?.user?.avatar}
              alt="User"
              className="w-20 h-20 rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {loc?.state?.user?.name}
            </h3>
          </div>

          {/* Three dots menu */}
          <div className="relative" ref={menuRef}>
            <div
              className="text-[#181818] font-bold text-4xl cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ⋮
            </div>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute top-8 right-0 w-[8em] bg-white shadow-lg rounded-xl p-2 z-50">
                <button
                  className="text-[13px] px-4 py-2 hover:bg-gray-100 rounded-md text-[#000000]"
                  onClick={() => setIsReport(!isReport)}
                >
                  Report User
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="mt-8 border rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <p className="font-medium">Email Address</p>
              <p className="text-gray-500">{loc?.state?.user?.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-gray-500">
                {loc?.state?.user?.phone_number}
              </p>
            </div>
            <div>
              <p className="font-medium">Location</p>
              <p className="text-gray-500">
                {loc?.state?.user?.city}, {loc?.state?.user?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Reportuser
        isOpen={isReport}
        userId={loc?.state?.user?.uid}
        setIsOpen={setIsReport}
      />
    </div>
  );
};

export default UserProvider;

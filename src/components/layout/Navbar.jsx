import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { LogoWhite, Avatar } from "../../assets/export";
import { FaBell } from "react-icons/fa";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import LogOutModal from "../global/LogoutModal";
import ReportAnIssueModal from "../app/Settings/ReportAnIssueModal";
const Navbar = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropMemberOpen, setIsDropMemberOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userPopup, setUserPopup] = useState(false);
  const [logoutpopup, setLogoutpopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const dropdownRef = useRef(null);
  const memberRef = useRef(null);

  const isActiveParent = (urls) =>
    urls.some((url) => currentPath.includes(url));

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsDropMemberOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        memberRef.current &&
        !memberRef.current.contains(event.target)
      ) {
        closeMenus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const menuLinks = type === "serviceprovider"
    ? [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Discover", path: "/discover-job" },
      { label: "Availability", path: "/calendar" },
      { label: "Messages", path: "/chat-sp" },
      { label: "Badges", path: "/badge-sp" },
      { label: "Wallet", path: "/wallet" },
    ]
    : [
      { label: "Current Bookings", path: "/booking-requests" },
      { label: "Booking History", path: "/booking-history" },
      { label: "Badges", path: "/app/badge" },
      { label: "Favorites", path: "/favorites" },
      { label: "Messages", path: "/messages" },
    ];

  const togglePopup = () => {
    if (userPopup) setUserPopup(false);
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleUserpopup = () => {
    if (isPopupOpen) setIsPopupOpen(false)
    setUserPopup(!userPopup);
  };

  const notifications = [
    {
      title: "View Request Accepted",
      time: "7:30 PM",
      message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 1
    },
    {
      title: "Lease Date Dispute Received",
      time: "7:30 PM",
      message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 1
    },
    {
      title: "Tenant Moved Out",
      time: "7:30 PM",
      message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 0
    },
    {
      title: "Title goes here",
      time: "7:30 PM",
      message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 0
    }
  ];


  return (
    <nav className="w-full border-b border-white/40  text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="w-[60%]">
          <img
            src={LogoWhite}
            alt="Logo"
            className="w-[180px] cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Logged-in Menu */}
        {isLoggedIn ? (
          <div className="hidden w-full md:flex justify-end items-center gap-10 font-medium text-sm">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className=""
              >
                {link.label}
              </Link>
            ))}
            {/* Notification Icon with Popup toggle */}
            <div className="relative">
              <IoNotificationsOutline
                className='text-white text-2xl cursor-pointer'
                onClick={togglePopup}
              />
              {/* Notification Popup */}
              {isPopupOpen && (
                <div className="absolute top-12 z-10 right-0 w-[26em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
                  <h3 className="text-lg font-semibold text-[#181818]">Notifications</h3>
                  <div className="mt-4 space-y-4">
                    {notifications.map((notification, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-black font-medium">{notification.title}</span>
                          <span className="text-[13px] text-black font-medium">{notification.time}</span>
                        </div>
                        <div className='flex justify-between items-center pt-1 pb-1'>
                          <p className='text-[13px] text-black mr-[3em]'>{notification.message}</p>
                          {notification.unreadCount > 0 && (
                            <span className="text-sm bg-red-600 h-5 w-8 items-center flex justify-center text-white rounded-full">
                              {notification.unreadCount}
                            </span>
                          )}
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <img src={Avatar} className='h-10 w-10 rounded-full object-cover cursor-pointer' alt="User Avatar" onClick={toggleUserpopup} />

            {userPopup && (
              <div className="absolute top-[6em] right-10 w-[9em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
                <div className="space-y-3">
                  <span className="block text-[12px] font-[400] text-[#181818] cursor-pointer"
                    onClick={() => {
                      type === "serviceprovider" ? navigate("/provider-profile") : navigate("/app/profile")
                    }}
                  >View Profile</span>
                  <span className="block text-[12px] font-[400] text-[#181818] cursor-pointer" onClick={() => {
                    navigate("/app/settings")
                  }}>Settings</span>
                  <span className="block text-[12px] font-[400] text-[#181818] cursor-pointer" onClick={() => setIsReport(!isReport)}>Report an Issue</span>
                  <span onClick={() => {
                    setLogoutpopup(true);
                  }} className="block text-[12px] font-[400] text-red-600 hover:text-red-700 cursor-pointer">Log Out</span>
                </div>
              </div>
            )}

          </div>
        ) : (
          // Desktop Guest Menu
          <div className="hidden md:flex justify-between  w-full items-center gap-4">
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/cleaners">Cleaners</Link>
              </li>
              <li>
                <Link to="/why-us">Why Choose Us</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
            </ul>
            <div className="flex gap-4">
              <button
                className="border border-white px-4 py-1 rounded-md"
                onClick={() => navigate("/auth/role-selection")}
              >
                Signup
              </button>
              <button
                className="bg-[#26A7E2] text-white px-4 py-1 rounded-md"
                onClick={() => setIsLoggedIn(true)}
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {isLoggedIn && (
            <>
              <FaBell className="text-lg" />
              <img
                src={Avatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-white"
              />
            </>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden  text-white px-6 pb-4 space-y-4">
          {isLoggedIn ? (
            <>
              {menuLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block border-b border-white/20 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative">
                <IoNotificationsOutline
                  className='text-white text-2xl cursor-pointer'
                  onClick={togglePopup}
                />
                {/* Notification Popup */}
                {isPopupOpen && (
                  <div className="absolute top-12 z-10 right-0 w-[26em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <div className="mt-4 space-y-4">
                      {notifications.map((notification, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{notification.title}</span>
                            <span className="text-[13px] font-medium">{notification.time}</span>
                          </div>
                          <div className='flex justify-between items-center pt-1 pb-1'>
                            <p className='text-[13px] mr-[3em]'>{notification.message}</p>
                            {notification.unreadCount > 0 && (
                              <span className="text-sm bg-red-600 h-5 w-8 items-center flex justify-center text-white rounded-full">
                                {notification.unreadCount}
                              </span>
                            )}
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <img src={Avatar} className='h-10 w-10 rounded-full object-cover cursor-pointer' alt="User Avatar" onClick={toggleUserpopup} />

              {userPopup && (
                <div className="absolute top-[6em] right-10 w-[9em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
                  <div className="space-y-3">
                    <span className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer"
                      onClick={() => {
                        type === "serviceprovider" ? navigate("/app/profile") : navigate("/provider-profile")
                      }}
                    >View Profile</span>
                    <span className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer" onClick={() => {
                      navigate("/app/subscription-plans")
                    }}>Subscription Plans</span>
                    <span className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer" onClick={() => {
                      navigate("/app/settings")
                    }}>Settings</span>
                    <span className="block text-[12px] font-[400] text-[#181818] cursor-pointer" onClick={() => setIsReport(!isReport)}>Report an Issue</span>
                    <span onClick={() => {
                      setLogoutpopup(true);
                    }} className="block text-[12px] font-[500] text-red-600 hover:text-red-700 cursor-pointer">Log Out</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/home"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/cleaners"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cleaners
              </Link>
              <Link
                to="/why-us"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why Choose Us
              </Link>
              <Link
                to="/faqs"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQs
              </Link>
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block border border-white px-4 py-1 rounded-md mt-2"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block bg-[#26A7E2] text-white px-4 py-1 rounded-md mt-2"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}

      <LogOutModal isOpen={logoutpopup} setIsOpen={setLogoutpopup} />
      <ReportAnIssueModal isOpen={isReport} setIsOpen={setIsReport} />
    </nav>
  );
};

export default Navbar;

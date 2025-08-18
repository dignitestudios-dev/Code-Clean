import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { LogoWhite, Avatar } from "../../assets/export";
import { FaBell } from "react-icons/fa";
import { logout, resetError, resetAuthState } from "../../redux/slices/auth.slice"; // Import login action from Redux
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import LogOutModal from "../global/LogoutModal";
import ReportAnIssueModal from "../app/Settings/ReportAnIssueModal";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToast, SuccessToast } from "../global/Toaster";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userPopup, setUserPopup] = useState(false);
  const [logoutpopup, setLogoutpopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const { user, user_data, accessToken, logoutLoading, logoutSuccess, logoutError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  console.log(user_data, "navbar data");


  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      SuccessToast("Logged out successfully");
    } catch (e) {
      ErrorToast(e || "Logout failed");
    } finally {
      setIsLoggedIn(false);
      setLogoutpopup(false);
      window.location.href = "/auth/login"; // or navigate("/auth/login", { replace: true })
    }
  };

  useEffect(() => {
    if (user_data?.role) {
      setRole(user_data.role);
    }
  }, [user_data]); // dependency array me user_data rakho

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);



  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setUserPopup(false);
    setIsMobileMenuOpen(false);
    setIsPopupOpen(false);
  };

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  // // Check login state & role on mount
  // useEffect(() => {
  //   const userRole = Cookies.get("role");
  //   if (userRole === "user" || userRole === "provider") {
  //     setRole(userRole);
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //     setRole(null);
  //   }
  // }, [location.pathname]); // re-check role on route change

  const togglePopup = () => {
    setUserPopup(false);
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleUserpopup = () => {
    setIsPopupOpen(false);
    setUserPopup(!userPopup);
  };

  const menuLinks =
    role === "service_provider"
      ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Discover", path: "/discover-job" },
        { label: "Availability", path: "/calendar" },
        { label: "Messages", path: "/chat-sp" },
        { label: "Badges", path: "/badge-sp" },
        { label: "Wallet", path: "/wallet" },
      ]
      : role === "user"
        ? [
          { label: "Current Bookings", path: "/booking-requests" },
          { label: "Booking History", path: "/booking-history" },
          { label: "Badges", path: "/app/badge" },
          { label: "Favorites", path: "/favorites" },
          { label: "Messages", path: "/messages" },
        ]
        : [];

  const notifications = [
    {
      title: "View Request Accepted",
      time: "7:30 PM",
      message: "Lorem ipsum dolor sit amet consectetur.",
      unreadCount: 1,
    },
    {
      title: "Lease Date Dispute Received",
      time: "6:15 PM",
      message: "In volutpat et mattis ut tristique.",
      unreadCount: 1,
    },
    {
      title: "Tenant Moved Out",
      time: "5:00 PM",
      message: "Lorem ipsum dolor sit amet.",
      unreadCount: 0,
    },
  ];

  return (
    <nav
      className={`w-full ${isMobileMenuOpen
        ? "fixed top-0 left-0 min-h-screen bg-[#181818] z-50"
        : ""
        } text-white`}
    >
      <div className="max-w-7xl border-b border-white/40 mx-auto px-4 py-2 flex z-10 items-center justify-between relative">
        <div className="w-[60%]">
          <img
            src={LogoWhite}
            alt="Logo"
            className="w-[236px] h-[67px] cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Menu */}
        {isLoggedIn ? (
          <div className="hidden md:flex justify-end items-center gap-10 font-medium text-sm w-full">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`pb-1 relative text-[16px] font-[500] transition-all duration-300 ${currentPath === link.path
                  ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white"
                  : ""
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative">
              <IoNotificationsOutline
                className="text-white text-2xl cursor-pointer"
                onClick={togglePopup}
              />
              {isPopupOpen && (
                <div className="absolute top-10 right-0 w-[507px] h-[507px] overflow-auto p-4 bg-white shadow-lg rounded-[16px] border border-gray-200 z-50">
                  <h3 className="text-lg font-semibold text-black">
                    Notifications
                  </h3>
                  <div className="mt-4 space-y-4 max-h-60 overflow-y-auto">
                    {notifications.map((n, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between ">
                          <div>
                            <span className="text-[14px] font-bold text-black">
                              {n.title}
                            </span>
                            <p className="text-[13px]  text-[#18181880] font-[400]">{n.message}</p>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">
                              {n.time}
                            </div>
                            {n.unreadCount > 0 && (
                              <div className="bg-red-600 mt-1 text-white text-xs rounded-full w-[19px] h-[19px] flex items-center justify-center ">
                                {n.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>

                        <hr className="mt-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <img
              src={Avatar}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={toggleUserpopup}
              alt="Avatar"
            />
            {userPopup && (
              <div className="absolute top-20 right-4 bg-white w-[155px] h-[157px] text-black rounded-[8px] shadow-lg p-4 space-y-2 z-[99999]">
                <span
                  className="block font-[400] py-1 text-sm border-b  border-[#E4E4E4] cursor-pointer"
                  onClick={() =>
                    navigate(
                      role == "service_provider" ? "/provider-profile" : "/app/profile"
                    )
                  }
                >
                  View Profile
                </span>
                <span
                  className="block font-[400] py-1 border-b  border-[#E4E4E4] text-sm cursor-pointer"
                  onClick={() => navigate("/app/settings")}
                >
                  Settings
                </span>
                <span
                  className="block font-[400] py-1 border-b  border-[#E4E4E4] text-sm cursor-pointer"
                  onClick={() => setIsReport(true)}
                >
                  Report an Issue
                </span>
                <span
                  className="block font-[400] py-1  text-sm text-red-600 cursor-pointer"
                  onClick={() => setLogoutpopup(true)}
                >
                  Log Out
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium w-full justify-between">
            <ul className="flex gap-6">
              <li className="relative">
                <Link
                  className={`relative pb-1 text-[16px] font-[500] transition-all duration-300 ${currentPath === "/app/landing"
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-2/3 after:h-[2px] after:bg-white after:rounded"
                    : ""
                    }`}
                  to="/app/landing"
                >
                  Home
                </Link>
              </li>
              <li>
                <a href="#cleaners" className="text-[16px] font-[500]" >Cleaners</a>
              </li>
              <li>
                <a href="#whyus" className="text-[16px] font-[500]" >Why Choose Us</a>
              </li>
              <li>
                <a href="#faq" className="text-[16px] font-[500]" >FAQs</a>
              </li>
            </ul>
            <div className="flex gap-4">
              <button
                className="border border-white w-[127px] h-[44px] rounded-md"
                onClick={() => navigate("/auth/role-selection")}
              >
                Signup
              </button>
              <button
                className="bg-[#26A7E2] text-white w-[127px] h-[44px] rounded-md"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* Mobile Toggle */}
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
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <HiX size={28} color="#26A7E2" />
            ) : (
              <HiMenu size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto text-white">
          {isLoggedIn ? (
            <>
              {menuLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block py-2 border-b border-white/20"
                  onClick={toggleMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <IoNotificationsOutline
                className="text-white text-2xl cursor-pointer"
                onClick={togglePopup}
              />
              <img
                src={Avatar}
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
                alt="User Avatar"
                onClick={toggleUserpopup}
              />
              {userPopup && (
                <div className="bg-white text-black w-full rounded shadow-lg p-4 space-y-2 mt-2">
                  <span
                    className="block text-sm cursor-pointer"
                    onClick={() => navigate("/app/profile")}
                  >
                    View Profile
                  </span>
                  <span
                    className="block text-sm cursor-pointer"
                    onClick={() => navigate("/app/settings")}
                  >
                    Settings
                  </span>
                  <span
                    className="block text-sm cursor-pointer"
                    onClick={() => setIsReport(true)}
                  >
                    Report an Issue
                  </span>
                  <span
                    className="block text-sm text-red-600 cursor-pointer"
                    onClick={() => setLogoutpopup(true)}
                  >
                    Log Out
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/app/landing"
                className="block py-2 text-[16px] font-[500]"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <a
                href="#cleaners"
                className="block py-2 text-[16px] font-[500]"
                onClick={toggleMobileMenu}
              >
                Cleaners
              </a>
              <a
                href="#whyus"
                className="block py-2 text-[16px] font-[500]"
                onClick={toggleMobileMenu}
              >
                Why Choose Us
              </a>
              <a href="#faq" className="block py-2 text-[16px] font-[500]" onClick={toggleMobileMenu}>
                FAQs
              </a>
              <button
                onClick={() => {
                  navigate("/auth/role-selection");
                  toggleMobileMenu();
                }}
                className="w-full border border-white px-4 py-1 rounded-md"
              >
                Signup
              </button>
              <button
                onClick={() => {
                  navigate("/auth/login");
                  toggleMobileMenu();
                }}
                className="w-full bg-[#26A7E2] text-white px-4 py-1 rounded-md"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}

      <LogOutModal
        isOpen={logoutpopup}
        setIsOpen={setLogoutpopup}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
      <ReportAnIssueModal isOpen={isReport} setIsOpen={setIsReport} />
    </nav>
  );
};

export default Navbar;

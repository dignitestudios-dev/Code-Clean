import { useEffect, useState, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { IoNotificationsOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { Avatar, LogoWhite } from "../../../assets/export";
import LogOutModal from "../../global/LogoutModal";
import ReportAnIssueModal from "../Settings/ReportAnIssueModal";

const LandingNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutpopup, setLogoutpopup] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const userRole = Cookies.get("role");
    if (userRole === "user" || userRole === "provider") {
      setRole(userRole);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, [location.pathname]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (id) =>
    `text-[16px] font-[500] relative pb-1 transition-all duration-300 ${
      activeSection == id
        ? "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-2/3 after:h-[2px] after:bg-white after:rounded"
        : ""
    }`;

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
      className={`w-full ${
        isMobileMenuOpen
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
            onClick={() => {
              navigate("/");
              setActiveSection("home");
            }}
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium w-full justify-between">
          <ul className="flex w-full gap-6">
            <li>
              <Link
                to="/app/landing"
                onClick={() => setActiveSection("home")}
                className={linkClass("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <a href="#cleaners"  onClick={() => setActiveSection("cleaners")} className={linkClass("cleaners")}>
                Cleaners
              </a>
            </li>
            <li>
              <a href="#whyus"  onClick={() => setActiveSection("whyus")} className={linkClass("whyus")}>
                Why Choose Us
              </a>
            </li>
            <li>
              <a href="#faq"  onClick={() => setActiveSection("faq")} className={linkClass("faq")}>
                FAQs
              </a>
            </li>
          </ul>

          {isLoggedIn ? (
            <div className="relative flex items-center gap-6">
              {/* Notification */}
              <div ref={notifRef} className="relative">
                <IoNotificationsOutline
                  className="text-white text-2xl cursor-pointer"
                  onClick={() => setShowNotificationDropdown((prev) => !prev)}
                />
                {showNotificationDropdown && (
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
                              <p className="text-[13px]  text-[#18181880] font-[400]">
                                {n.message}
                              </p>
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

              {/* Profile */}
              <div ref={profileRef} className="relative">
                <img
                  src={Avatar}
                  className=" w-[50px] rounded-full cursor-pointer"
                  onClick={()=>setShowProfileDropdown(!showProfileDropdown)}
                  alt="Avatar"
                />
                {showProfileDropdown && (
                  <div className="absolute top-20 right-0 bg-white w-[155px] h-[157px] text-black rounded-[8px] shadow-lg p-4 space-y-2 z-[99999]">
                    <span
                      className="block font-[400] py-1 text-sm border-b  border-[#E4E4E4] cursor-pointer"
                      onClick={() =>
                        navigate(
                          role === "provider"
                            ? "/provider-profile"
                            : "/app/profile"
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
            </div>
          ) : (
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
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {isLoggedIn && (
            <img
              src={Avatar}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-white"
              onClick={() =>
                navigate(
                  role === "provider" ? "/provider-profile" : "/app/profile"
                )
              }
            />
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
          <Link
            to="/app/landing"
            className="block py-2 text-[16px] font-[500]"
            onClick={() => {
              setActiveSection("home");
              toggleMobileMenu();
            }}
          >
            Home
          </Link>
          <a
            href="#cleaners"
            className="block py-2 text-[16px] font-[500]"
            onClick={() => {
              setActiveSection("cleaners");
              toggleMobileMenu();
            }}
          >
            Cleaners
          </a>
          <a
            href="#whyus"
            className="block py-2 text-[16px] font-[500]"
            onClick={() => {
              setActiveSection("whyus");
              toggleMobileMenu();
            }}
          >
            Why Choose Us
          </a>
          <a
            href="#faq"
            className="block py-2 text-[16px] font-[500]"
            onClick={() => {
              setActiveSection("faq");
              toggleMobileMenu();
            }}
          >
            FAQs
          </a>

          {!isLoggedIn ? (
            <>
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
          ) : (
            <button
              onClick={() => {
                navigate(
                  role === "provider" ? "/provider-profile" : "/app/profile"
                );
                toggleMobileMenu();
              }}
              className="w-full border border-white px-4 py-2 rounded-md"
            >
              View Profile
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <LogOutModal isOpen={logoutpopup} setIsOpen={setLogoutpopup} />
      <ReportAnIssueModal isOpen={isReport} setIsOpen={setIsReport} />
    </nav>
  );
};

export default LandingNavbar;

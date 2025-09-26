import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { HeroBg } from "../../../assets/export";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookinghistory } from "../../../redux/slices/users.slice";
import Pagination from "../../../components/global/Pagination";

const Bookinghistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookinghistorydata, bookinghistoryLoading } = useSelector(
    (state) => state.user
  );
  const [booking, setBooking] = useState([]); // Set initial state as an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // Active tab state

  useEffect(() => {
    dispatch(fetchBookinghistory("/user/booking-history"));
  }, [dispatch]);

  const sliceBaseUrl = (url) => {
    if (!url) return null;
    try {
      const base = "https://api.codecleanpros.com/api/";
      return url.startsWith(base) ? url.replace(base, "") : url;
    } catch {
      return url;
    }
  };

  const handlePageChange = (url) => {
    const cleanUrl = sliceBaseUrl(url);
    if (cleanUrl) {
      dispatch(fetchBookinghistory(cleanUrl));
    }
  };

  useEffect(() => {
    if (bookinghistorydata && bookinghistorydata.data) {
      setBooking(bookinghistorydata.data); // Update with actual API data
    }
  }, [bookinghistorydata]);

  // Filtered bookings based on search query and active tab
  const filteredBookings = booking.filter((booking) => {
    // Filter bookings based on the selected tab (All, Completed Jobs, Canceled Jobs)
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Completed Jobs" &&
        booking.status.toLowerCase() === "completed") ||
      (activeTab === "Canceled Jobs" &&
        booking.status.toLowerCase() === "cancelled");

    // Filter bookings based on the search query (for booking details like name, date, and status)
    const matchesSearchQuery =
      booking.service_provider.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchQuery.toLowerCase());

    // Return bookings that match both the tab and the search query
    return matchesTab && matchesSearchQuery;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update active tab
  };

  // Skeleton Loader Component
  const SkeletonRows = ({ count = 6 }) => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i} className="animate-pulse border-t">
          <td className="px-6 py-4">
            <div className="h-4 w-6 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-4 bg-gray-200 rounded" />
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] z-50"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgba(39, 168, 226, 1) -20.45%, rgba(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex justify-between items-center gap-3 px-10 lg:px-40  w-full -mb-10">
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft color="white" size={20} />
            </button>
            <h2 className="text-white text-[30px] font-bold leading-[48px] capitalize">
              Booking history
            </h2>
          </div>
          <div>
            {/* Search Bar Section */}
            <div className="px-[0em] py-[2em]">
              <div className="relative">
                <CiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  color="white"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for bookings"
                  className="w-full py-3 pl-10 pr-5 rounded-lg border bg-white/10 !text-white border-[#ccc] text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Table Section */}
      <div className="px-10 lg:px-[10em] py-[4em] bg-[#f5f8fb00] -mt-[18em] relative mb-10">
        <div className="bg-white rounded-xl h-[400px] shadow-md mb-4 overflow-x-auto">
          {/* Tabs */}
          <div className="flex border-b px-6 pt-6">
            {["All", "Completed Jobs", "Canceled Jobs"].map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 text-sm font-[500] text-[#000000] hover:text-[#00AEEF] focus:outline-none border-b-2 ${
                  activeTab === tab ? "border-[#00AEEF]" : "border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <table className="w-full text-left mt-4">
            <thead>
              <tr className="bg-[#E9F4FB] text-[#3F3F3F] text-sm">
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Booker</th>
                <th className="px-6 py-3">Booking Date</th>
                <th className="px-6 py-3">Booking Time</th>
                <th className="px-6 py-3">Total Duration</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#3F3F3F]">
              {bookinghistoryLoading ? (
                <SkeletonRows count={6} />
              ) : (
                <>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-sm font-semibold text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((row, index) => (
                      <tr
                        onClick={() =>
                          navigate(
                            `/booking-details?id=${row.booking_id}&status=${row.status}`
                          )
                        }
                        key={index}
                        className="border-t"
                      >
                        <td className="px-6 py-4">{row.booking_id}</td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src={
                              row.service_provider.avatar
                                ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${row.service_provider.avatar}`
                                : "https://randomuser.me/api/portraits/men/1.jpg"
                            }
                            alt={row.service_provider.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          {row.service_provider.name}
                        </td>
                        <td className="px-6 py-4">{row.date}</td>
                        <td className="px-6 py-4">{row.time}</td>
                        <td className="px-6 py-4">{row.duration} hrs</td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-semibold ${
                              row.status === "completed"
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {row.status.charAt(0).toUpperCase() +
                              row.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#00AEEF] cursor-pointer">
                          <span>&gt;</span>
                        </td>
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
          <Pagination
        links={bookinghistorydata?.links}
        onPageChange={handlePageChange}
      />
      </div>
    
      <Footer />
    </div>
  );
};

export default Bookinghistory;

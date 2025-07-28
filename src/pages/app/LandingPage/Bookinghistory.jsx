import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { HeroBg } from "../../../assets/export";
import Navbar from '../../../components/layout/Navbar';
import Footer from "../../../components/layout/Footer";
import { CiSearch } from "react-icons/ci";


const Bookinghistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample booking data
  const bookings = [
    {
      id: 1,
      name: "Michael Brown",
      date: "16-January-2025",
      time: "10:00 Am",
      duration: "4hrs",
      status: "Completed",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sophia Turner",
      date: "16-January-2025",
      time: "10:00 Am",
      duration: "4hrs",
      status: "Completed",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Justin Cruz",
      date: "16-January-2025",
      time: "10:00 Am",
      duration: "4hrs",
      status: "Canceled",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  // Filtered bookings based on search query
  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
        <div className="flex justify-between items-center gap-3 ml-[11em] w-[74em] -mb-10">
          
          <div className='flex gap-3'>
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
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" color='white' size={20} />
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
      <div className="px-[10em] py-[4em] bg-[#f5f8fb00] -mt-[18em] relative mb-10">
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          {/* Tabs */}
          <div className="flex border-b px-6 pt-6">
            {["All", "Upcoming Jobs", "In Progress Jobs", "Completed Jobs", "Canceled Jobs"].map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm font-medium text-[#3F3F3F] hover:text-[#00AEEF] focus:outline-none border-b-2 ${index === 0 ? "border-[#00AEEF]" : "border-transparent"}`}
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
              {filteredBookings.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {row.name}
                  </td>
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4">{row.time}</td>
                  <td className="px-6 py-4">{row.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${row.status === "Completed" ? "text-green-600" : "text-red-500"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#00AEEF] cursor-pointer">
                    <span>&gt;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bookinghistory;

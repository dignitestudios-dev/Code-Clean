import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { HeroBg } from "../../../assets/export";
import Navbar from '../../../components/layout/Navbar';
import Footer from "../../../components/layout/Footer";
import { CiSearch } from "react-icons/ci";

const Bookingsrequests = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Booking Request');

    // Sample booking data
    const bookings = [
        {
            id: 1,
            name: "Justin Cruz",
            date: "16-January-2025",
            time: "10:00 Am",
            duration: "4hrs",
            status: "Waiting",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: 2,
            name: "John Doe",
            date: "16-January-2025",
            time: "10:00 Am",
            duration: "4hrs",
            status: "Rejected",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            id: 2,
            name: "John Doe",
            date: "16-January-2025",
            time: "10:00 Am",
            duration: "4hrs",
            status: "In Progress",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            id: 3,
            name: "Emily Johnson",
            date: "16-January-2025",
            time: "10:00 Am",
            duration: "4hrs",
            status: "Accepted",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        {
            id: 4,
            name: "Sarah Williams",
            date: "17-January-2025",
            time: "2:00 Pm",
            duration: "3hrs",
            status: "Completed",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
            id: 5,
            name: "Mark Thompson",
            date: "18-January-2025",
            time: "11:00 Am",
            duration: "2hrs",
            status: "Cancelled",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
            id: 6,
            name: "Ava Martinez",
            date: "19-January-2025",
            time: "9:00 Am",
            duration: "1.5hrs",
            status: "Waiting",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        {
            id: 7,
            name: "Liam Anderson",
            date: "20-January-2025",
            time: "3:30 Pm",
            duration: "5hrs",
            status: "Accepted",
            avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        {
            id: 8,
            name: "Olivia Garcia",
            date: "21-January-2025",
            time: "12:00 Pm",
            duration: "3hrs",
            status: "Completed",
            avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        },
    ];

    // Filtered bookings based on search query
    const filteredBookings = bookings
        .filter((booking) =>
            booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.status.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((booking) => {
            if (activeTab === "Current Bookings") {
                return booking.status === "Accepted" || booking.status === "Completed";
            } else if (activeTab === "Booking Request") {
                return booking.status === "Waiting" || booking.status === "Rejected" || booking.status === "In Progress";
            }
            return true;
        });


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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

                    <div className="flex gap-3 items-center">
                        <button type="button" onClick={() => navigate(-1)}>
                            <FaArrowLeft color="white" size={20} />
                        </button>
                        <h2 className="text-white text-[28px] font-bold leading-[48px] capitalize">
                            {activeTab === 'Current Bookings' ? 'Current Bookings' : 'Booking Requests'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" color='white' size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search for bookings"
                                className="w-[260px] py-3 pl-10 pr-5  rounded-lg border !text-white border-[#ccc] bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                            />
                        </div>

                        {/* Tab Section */}
                        <div className="flex gap-4 bg-white rounded-xl p-[6px] text-sm">
                            {["Current Bookings", "Booking Request"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`px-4 py-2 rounded-lg ${activeTab === tab
                                        ? 'bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white'
                                        : 'bg-white text-blue-600'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                    </div>

                </div>

            </div>



            {/* Booking Table Section */}
            <div className="px-[10em] py-[4em] bg-[#f5f8fb00] -mt-[16em] relative mb-10">
                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    {/* Tabs for Filter */}
                    <div className="flex border-b px-6 pt-6">
                        {(activeTab === "Booking Request"
                            ? ["All", "Pending Requests", "Accepted", "Rejected"]
                            : ["All", "Upcoming Jobs", "In Progress Jobs", "Completed Jobs", "Canceled Jobs"]
                        ).map((tab, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 text-sm font-[500] text-[#000000] hover:text-[#00AEEF] focus:outline-none border-b-2 ${index === 0 ? "border-[#00AEEF]" : "border-transparent"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {/* Table */}
                    <table className="w-full text-left mt-4">
                        <thead>
                            <tr className="bg-[#E9F4FB] text-[#173579] text-sm">
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Booker</th>
                                <th className="px-6 py-3">Booking Date</th>
                                <th className="px-6 py-3">Booking Time</th>
                                <th className="px-6 py-3">Total Duration</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-[#3F3F3F]" >
                            {filteredBookings.map((row, index) => (
                                <tr key={index} className="border-t cursor-pointer" onClick={() => navigate(`/booking-details?id=${row.id}&status=${row.status}`)}>
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
                                        <span className={`font-semibold ${row.status === "Accepted" ? "text-green-600" :
                                            row.status === "Waiting" ? "text-orange-500" :
                                                row.status === "In Progress" ? "text-blue-600" :
                                                    "text-red-500"}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 text-[#00AEEF] cursor-pointer"

                                    >
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

export default Bookingsrequests;

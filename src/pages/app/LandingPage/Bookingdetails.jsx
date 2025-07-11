import React from 'react';
import { useNavigate } from 'react-router';
import { FaArrowLeft, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaBell } from 'react-icons/fa';
import Navbar from '../../../components/layout/Navbar';
import { HeroBg } from "../../../assets/export";
import { user } from "../../../assets/export";

const Bookingdetails = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
                <div className='flex items-center gap-3 ml-[8em]'>
                    <button type="button" cla onClick={() => navigate(-1)} >
                        <FaArrowLeft color='white' size={20} />
                    </button>
                    <h2 className="text-white text-[30px] mt-0 font-bold leading-[48px] capitalize">
                        Booking details
                    </h2>
                </div>

            </div>

            {/* Main Content */}
            <div className='bg-[#F9FAFA] p-3'>
                <div className="max-w-7xl mx-auto px-4 py-8 border-2 rounded-2xl -mt-[17em] bg-[#F9FAFA]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Booking Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h3 className="text-xl font-bold mb-4">Booking Description</h3>
                                <p className="text-gray-600 mb-6">
                                    The standard Lorem Ipsum passage, m ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The standard Lorem Ipsum passage.
                                </p>

                                {/* Date and Time */}
                                <div className="flex items-center gap-8 mb-6 border-t-[1px] pt-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Date</p>
                                        <p className="font-medium">26 Dec, 2024</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Time</p>
                                        <p className="font-medium">08:00pm</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="mb-6 border-t-[1px] pt-6">
                                    <p className="text-sm text-gray-500 mb-1">Location</p>
                                    <div className="flex items-center space-x-2">
                                        <FaMapMarkerAlt className="text-[#353adf]" />
                                        <p className="font-medium">Downtown, Los Angeles</p>
                                    </div>
                                </div>

                                {/* Cleaning Services */}
                                <div className="mb-6 border-t-[1px] pt-6">
                                    <h4 className="text-lg font-semibold mb-4">Cleaning Services</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-left border-r-2">
                                            <p className="text-1xl text-gray-500">Bathroom Cleaning</p>
                                            <p className="text-sm font-bold">02</p>
                                        </div>
                                        <div className="text-left border-r-2">
                                            <p className="text-1xl text-gray-500">Bedroom Cleaning</p>
                                            <p className="text-sm font-bold">04</p>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-1xl text-gray-500">Kitchen Cleaning</p>
                                            <p className="text-sm font-bold">01</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Provider Details */}
                                <div>
                                    <h4 className="text-lg font-semibold mb-4">Service Provider Details</h4>
                                    <div className="flex items-center justify-between border-t-[1px] pt-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <img src={user} alt="" />
                                            </div>
                                            <div>
                                                <p className="font-medium">John Doe</p>
                                                <p className="text-yellow-500 text-sm">⭐ 4.9</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 text-sm underline hover:text-blue-800 font-medium">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Job Details and Payment */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                {/* Status and Timer */}
                                <div className="text-center mb-6 flex gap-3">
                                    <div className="inline-block bg-orange-100 text-orange-600 px-10 py-4 rounded text-sm font-medium mb-2 w-full text-center">
                                        Waiting
                                    </div>
                                    <div className="inline-block text-black border-2 px-10 py-4 rounded text-sm font-medium mb-2 w-full text-center">

                                        <h1>jfd</h1>
                                    </div>
                                </div>


                                {/* Message Button */}
                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mb-6 flex items-center justify-center space-x-2">
                                    <FaEnvelope />
                                    <span>Message</span>
                                </button>

                                {/* Job Details */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold mb-4">Job Detail</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">ID</span>
                                            <span className="font-medium">A1512121</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Date</span>
                                            <span className="font-medium">12/01/2025</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Time</span>
                                            <span className="font-medium">10 AM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Duration</span>
                                            <span className="font-medium">2 hr</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Payment */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold mb-4">Total Payment</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Subtotal</span>
                                            <span className="font-medium">$790</span>
                                        </div>
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>$790</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Cancel Button */}
                                <button
                                    className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600"
                                    onClick={() => alert('Booking Canceled')}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default Bookingdetails;
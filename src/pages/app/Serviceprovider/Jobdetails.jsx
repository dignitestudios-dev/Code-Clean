import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCheck,
} from "react-icons/fa";
import Navbar from "../../../components/layout/Navbar";
import { ChatIcon, HeroBg } from "../../../assets/export";
import { user } from "../../../assets/export";
import ServiceRatingUI from "../../../components/app/Profile/ServiceRatingUi";
import { TiWarning } from "react-icons/ti";
import Footer from "../../../components/layout/Footer";
import Cookies from "js-cookie";
import Feedback from "../../../components/global/FeedBack";
import ReportUser from "../../../components/Serviceprovider/Reportuser";
const Jobdetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const [rating, setRating] = useState(false);
  const [inProgressModal, setInProgressModal] = useState(false);
  const [cancelbooking, setCancelbooking] = useState(false);
  const [cancelreason, setCancelreason] = useState(false);
  const [rejectedreasons, setRejectedreasons] = useState(false);
  const [reason, setReason] = useState("");
  const [rejectedpopup, setRejectedpopup] = useState(false);
  const [rejectedreqcomplete, setRejectedreqcomplete] = useState(false);
  const [reportUser, setReportUser] = useState(false);
  const [role, SetRole] = useState("");
  useEffect(() => {
    SetRole(Cookies.get("role"));
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar type="serviceprovider" />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex items-center gap-3 ml-[12em]">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={20} />
          </button>
          <h2 className="text-white text-[30px] mt-0 font-bold leading-[48px] capitalize">
            Job details
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F9FAFA] p-3">
        <div className="max-w-7xl mx-auto px-4 py-8 border-2 rounded-2xl -mt-[17em] bg-[#F9FAFA]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Job Description</h3>
                <p className="text-gray-600 mb-6">
                  The standard Lorem Ipsum passage, m ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. The standard Lorem Ipsum
                  passage.
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
                  <h4 className="text-lg font-semibold mb-4">
                    Cleaning Services
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-left border-r-2">
                      <p className="text-1xl text-gray-500">
                        Bathroom Cleaning
                      </p>
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
                <div className="pb-10">
                  <h4 className="text-lg font-semibold mb-4">
                    Service Provider Details
                  </h4>
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
                    <button
                      onClick={() => {
                        navigate("/user-provider", {
                          state: { fromViewProfile: true },
                        });
                      }}
                      className="text-blue-600 text-sm underline hover:text-blue-800 font-medium"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Job Details and Payment */}
            <div className="lg:col-span-1">
              <div className="bg-white  rounded-lg shadow-md pb-[1em] pl-[2em] pr-[2em] pt-[1.3em]">
                {/* Status and Timer */}
                <div className="text-center mb-2 flex gap-3">
                  <div
                    onClick={() => {
                      if (status === "In Progress") {
                        setInProgressModal(true);
                        setTimeout(() => {
                          navigate("/home");
                        }, 2000);
                      }
                    }}
                    className={`inline-block cursor-pointer px-6 pt-3 rounded-[8px] h-[44px]  text-[16px] font-medium mb-2 w-full text-center 
                                      ${
                                        status === "Pending"
                                          ? "bg-[#EC832533] text-[#EC8325]"
                                          : status === "Upcoming Jobs"
                                          ? "bg-[#EC832533] text-[#EC8325]"
                                          : status === "Rejected"
                                          ? "bg-[#EE313133] text-[#EE3131]"
                                          : status === "Canceled Jobs"
                                          ? "bg-[#EE313133] text-[#EE3131]"
                                          : status === "Accepted"
                                          ? "bg-green-100 text-green-600"
                                          : status === "Completed"
                                          ? "bg-[#00C85333] text-[#00C853]"
                                          : status === "In Progress Jobs"
                                          ? "bg-[#00B0FF33] text-[#00B0FF]"
                                          : "bg-[#00C85333] text-[#00C853]"
                                      }
    `}
                  >
                    {status === "Pending"
                      ? "Pending"
                      : status === "In Progress Jobs"
                      ? "Inprogress"
                      : status === "Upcoming Jobs"
                      ? "Waiting"
                      : status === "Canceled Jobs"
                      ? "Cancelled"
                      : status}
                  </div>

                  {status !== "Completed Jobs" && status !== "Pending" && (
                    <div className="inline-block text-[#808080] h-[44px] border-2 px-10 pt-2 rounded-[8px] text-[20px] font-bold mb-2 w-full text-center">
                      00:00:00
                    </div>
                  )}
                </div>

                {/* Message Button */}
                {status !== "Completed Jobs" &&
                  status !== "Rejected" &&
                  status !== "Canceled Jobs" &&
                  status !== "Pending" && (
                    <button
                      onClick={() => {
                        navigate("/messages");
                      }}
                      className={`w-full ${
                        role == "user"
                          ? "bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white"
                          : " border border-[#27A8E2]  "
                      }  py-3 rounded-[8px] text-gradient font-medium mb-4 flex items-center justify-center space-x-2`}
                    >
                      <img
                        src={ChatIcon}
                        className="w-[21px] h-[21px]"
                        alt="ChatIcon"
                      />
                      <span className="mt-1">Message</span>
                    </button>
                  )}
                {status == "Pending" && (
                  <>
                    <div className="flex justify-center mb-4  gap-3">
                      <button
                        className="bg-[#EE3131] w-full text-white px-6 py-3 rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRejectedpopup(true);
                        }}
                      >
                        Reject
                      </button>

                      {rejectedpopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white rounded-xl p-6 md:w-[30em] shadow-2xl text-center">
                            {/* Checkmark Icon */}
                            <div className="mb-4 flex justify-center items-center">
                              <div className=" w-[70px] h-[70px] rounded-full flex justify-center items-center">
                                <TiWarning size={70} color="#EE3131" />
                              </div>
                            </div>
                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                              Reject Request!
                            </h2>
                            {/* Message */}
                            <p className="text-gray-600 text-sm mb-4">
                              Are you sure you want reject this request
                            </p>
                            <div className="flex gap-4 justify-center">
                              <button
                                className="bg-[#F2F1F1] text-black px-8 p-3 text-sm rounded-xl"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRejectedpopup(false);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRejectedreasons(true);
                                }}
                                className="bg-[#EE3131] rounded-xl px-8 text-sm  p-3 text-white"
                              >
                                Reject Now
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {rejectedreasons && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                          {/* This outer div handles the background click to close, optional */}
                          <div
                            className="bg-white rounded-xl shadow-lg w-[440px] p-6"
                            onClick={(e) => e.stopPropagation()} // ← Important line!
                          >
                            <h2 className="text-[26px] font-bold text-black text-center mb-6">
                              Reject Reason
                            </h2>

                            <label className="block text-sm text-left font-medium text-black mb-1">
                              Reason
                            </label>
                            <textarea
                              rows={4}
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              placeholder="Type your reason here..."
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 text-black resize-none focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            <div className="flex justify-between gap-4 mt-6">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRejectedpopup(false); // Close warning popup
                                  setRejectedreasons(false); // Close reason popup
                                  setRejectedreqcomplete(true); // Show success modal
                                  setTimeout(() => {
                                    navigate(
                                      "/job-details?id=3&status=Rejected"
                                    );
                                  }, 2000);
                                }}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white font-semibold hover:bg-red-600 transition"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {rejectedreqcomplete && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white rounded-xl p-10 md:w-[26em] shadow-2xl text-center">
                            {/* Checkmark Icon */}
                            <div className="mb-4 flex justify-center items-center">
                              <div className="bg-gradient-to-r from-[#27A8E2] to-[#00034A] w-[70px] h-[70px] rounded-full flex justify-center items-center">
                                <FaCheck color="white" size={30} />
                              </div>
                            </div>
                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                              Request Rejected
                            </h2>
                            {/* Message */}
                            <p className="text-gray-600 text-sm mb-4">
                              You have Reject the user request. Thank you for
                              taking action promptly!
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        className="bg-gradient-to-r w-full from-[#27A8E2] to-[#00034A] text-white px-6 py-2 rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/job-details?id=3&status=Accepted");
                        }}
                      >
                        Accept
                      </button>
                    </div>
                  </>
                )}

                {status == "Upcoming Jobs" && (
                  <button className="w-full capitalize bg-gradient text-white py-3 mb-6 rounded-lg font-medium hover:bg-red-600">
                    start job
                  </button>
                )}
                {status == "In Progress Jobs" && (
                  <button className="w-full bg-gradient text-white py-3 mb-6 rounded-lg font-medium hover:bg-red-600">
                    Mark Job completed
                  </button>
                )}

                {/* Job Details */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Job Detail</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3">
                      <span className="text-gray-500">ID</span>
                      <span className="font-medium">A1512121</span>
                    </div>
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3 ">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium">12/01/2025</span>
                    </div>
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3">
                      <span className="text-gray-500">Time</span>
                      <span className="font-medium">10 AM</span>
                    </div>
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3">
                      <span className="text-gray-500">Total Duration</span>
                      <span className="font-medium">2 hr</span>
                    </div>
                  </div>
                </div>

                {/* Total Payment */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Total Payment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">$790</span>
                    </div>
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3 font-semibold">
                      <span>Total</span>
                      <span>$790</span>
                    </div>
                  </div>
                </div>

                {status == "Completed Jobs" && (
                  <Feedback setReportUser={setReportUser} />
                )}

                {/* Cancel Button */}
                {status !== "Accepted" &&
                  status !== "Completed Jobs" &&
                  status !== "Pending" &&
                  status !== "Canceled Jobs" &&
                  status !== "Rejected" && (
                    <button
                      className="w-full bg-[#EE3131] text-white py-3 rounded-lg font-medium hover:bg-red-600"
                      onClick={() => {
                        setCancelbooking(true);
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}

                {status === "Rejected" && (
                  <div>
                    <h1>Rejection Reason </h1>
                    <p className="bg-[#F6F6F6] p-3 text-sm rounded-2xl mt-1">
                      Lorem ipsum dolor sit amet consectetur. Suspendisse ut
                      scelerisque ipsum dolor tristique donec. Integer
                      suspendisse scelerisque laoreet.
                    </p>
                  </div>
                )}

                {status === "Completed" && (
                  <div className="space-y-3">
                    <button
                      className="w-full bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-3 rounded-lg font-medium hover:bg-red-600"
                      onClick={() => setRating(true)}
                    >
                      Write a review
                    </button>
                    <button
                      className="w-full bg-[#208BC733] text-[#208BC7] py-3 rounded-lg font-medium hover:bg-[#208ac742]"
                      onClick={() => alert("Booking Canceled")}
                    >
                      Report Service Provider
                    </button>
                  </div>
                )}

                <ServiceRatingUI isOpen={rating} setIsOpen={setRating} />

                {inProgressModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-10 md:w-[26em] shadow-2xl text-center">
                      {/* Checkmark Icon */}
                      <div className="mb-4 flex justify-center items-center">
                        <div className="bg-gradient-to-r from-[#27A8E2] to-[#00034A] w-[70px] h-[70px] rounded-full flex justify-center items-center">
                          <FaCheck color="white" size={30} />
                        </div>
                      </div>
                      {/* Title */}
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Transaction Complete
                      </h2>
                      {/* Message */}
                      <p className="text-gray-600 text-sm mb-4">
                        The amount of $200.00 has been successfully transferred
                        to the service provider.
                      </p>
                    </div>
                  </div>
                )}

                {cancelbooking && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-10 md:w-[26em] shadow-2xl text-center">
                      {/* Checkmark Icon */}
                      <div className="mb-4 flex justify-center items-center">
                        <div className=" w-[70px] h-[70px] rounded-full flex justify-center items-center">
                          <TiWarning size={70} color="red" />
                        </div>
                      </div>
                      {/* Title */}
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Cancel Booking!
                      </h2>
                      {/* Message */}
                      <p className="text-gray-600 text-sm mb-4">
                        If you cancel your booking 24 hours in advance, you will
                        receive a full refund. Cancelling 12 hours before the
                        scheduled service will result in a 50% refund, while
                        cancellations made less than 12 hours before the service
                        start time will not be eligible for a refund.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <button
                          className="bg-[#F2F1F1] text-black px-8 p-3 text-sm rounded-xl"
                          onClick={() => {
                            setCancelbooking(false);
                          }}
                        >
                          Don’t cancel
                        </button>
                        <button
                          onClick={() => {
                            setCancelreason(true);
                            setCancelbooking(false);
                          }}
                          className="rounded-xl px-8 bg-[#EE3131] text-sm  p-3 text-white"
                        >
                          Cancel now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {cancelreason && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 md:w-[30em] shadow-2xl text-center space-y-4">
                      {/* Title */}
                      <h2 className="text-2xl font-bold text-gray-800">
                        Cancel Reason
                      </h2>

                      {/* Textarea Input */}
                      <div className="text-left w-full">
                        <label
                          htmlFor="reason"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Reason
                        </label>
                        <textarea
                          id="reason"
                          rows={4}
                          placeholder="Write your reason for cancellation..."
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={() => {
                          navigate("/home");
                        }}
                        className="w-full bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-2 rounded-lg font-medium hover:opacity-90"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ReportUser isOpen={reportUser} setIsOpen={setReportUser} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobdetails;

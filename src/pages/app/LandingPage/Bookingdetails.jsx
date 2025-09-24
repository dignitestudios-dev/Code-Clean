import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCheck,
} from "react-icons/fa";
import Navbar from "../../../components/layout/Navbar";
import { HeroBg } from "../../../assets/export";
import ServiceRatingUI from "../../../components/app/Profile/ServiceRatingUi";
import { TiWarning } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  CancelBookingRequest,
  fetchBookingDetail,
} from "../../../redux/slices/users.slice";
import { ErrorToast } from "../../../components/global/Toaster";
import { Button } from "../../../components/global/GlobalButton";
import BookingCountdown from "../../../components/Serviceprovider/Appointment/BookingStartTimer";

const Bookingdetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [cancelReasonText, setCancelReasonText] = useState();
  const status = queryParams.get("status");
  const bookingId = queryParams.get("id");
  const [rating, setRating] = useState(false);
  const [inProgressModal, setInProgressModal] = useState(false);
  const [cancelbooking, setCancelbooking] = useState(false);
  const [cancelreason, setCancelreason] = useState(false);
  const { bookingDetail, isLoading } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookingDetail(bookingId));
  }, [dispatch]);
  const handleCancelBooking = async () => {
    if (!cancelReasonText) return ErrorToast("Reason is required");
    const data = {
      booking_id: bookingDetail?.booking_id,
      reason: cancelReasonText,
    };
    await dispatch(CancelBookingRequest(data));
    navigate("/booking-history");
  };

  const [canStart, setCanStart] = useState(false);

  // Parse booking date + time safely
  const parseBookingDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;

    let [time, modifier] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier) {
      modifier = modifier.toUpperCase();
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
    }

    if (hours > 12 && modifier) {
      modifier = null; // case "13:00 PM"
    }

    date.setHours(hours);
    date.setMinutes(minutes || 0);
    date.setSeconds(0);

    return date;
  };

  useEffect(() => {
    if (!bookingDetail?.date || !bookingDetail?.time) return;

    const bookingDateTime = parseBookingDateTime(
      bookingDetail.date,
      bookingDetail.time
    );
    if (!bookingDateTime) return;

    const checkTime = () => {
      const now = new Date();
      if (now >= bookingDateTime) {
        setCanStart(true);
      } else {
        setCanStart(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000); // check every second

    return () => clearInterval(interval);
  }, [bookingDetail]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex items-center gap-3 lg:px-32">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={20} />
          </button>
          <h2 className="text-white text-[30px] mt-0 font-bold leading-[48px] capitalize">
            Booking details
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className=" p-3">
        <div className="max-w-7xl mx-auto px-4 py-8 border-2 rounded-2xl -mt-[17em] bg-[#F9FAFA]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Booking Description</h3>
                <p className="text-gray-600 mb-6">
                  {bookingDetail?.description}
                </p>

                {/* Date and Time */}
                <div className="flex items-center gap-8 mb-6 border-t-[1px] pt-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-medium">{bookingDetail?.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Time</p>
                    <p className="font-medium">{bookingDetail?.time}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6 border-t-[1px] pt-6">
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-[#353adf]" />
                    <p className="font-medium">
                      {bookingDetail?.city + "," + bookingDetail?.state}
                    </p>
                  </div>
                </div>

                {/* Cleaning Services */}
                <div className="mb-6 border-t-[1px] pt-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Cleaning Services
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {bookingDetail?.cleaning_services?.map((item, i) => (
                      <div key={i} className="text-left border-r-2">
                        <p className="text-1xl text-gray-500">{item?.title}</p>
                        <p className="text-sm font-bold">{item?.quantity}</p>
                      </div>
                    ))}
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
                        <img
                          src={
                            import.meta.env.VITE_APP_AWS_URL +
                            bookingDetail?.service_provider?.avatar
                          }
                          className="w-full h-full rounded-full"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {bookingDetail?.service_provider?.name}
                        </p>
                        <p className="text-yellow-500 text-sm">
                          ⭐{bookingDetail?.service_provider?.rating}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/service-provider", {
                          state: {
                            fromViewProfile: true,
                            id: bookingDetail?.service_provider?.id,
                          },
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
              <div className="bg-white rounded-lg shadow-md pb-[1em] pl-[2em] pr-[2em] pt-[1.3em]">
                {/* Status and Timer */}
                <div className="text-center mb-6 flex gap-2">
                  <div
                    onClick={() => {
                      if (status === "In Progress") {
                        setInProgressModal(true);
                        setTimeout(() => {
                          navigate("/home");
                        }, 2000);
                      }
                    }}
                    className={`inline-block text-nowrap cursor-pointer px-3 py-4 rounded text-[17px] font-medium mb-2 w-full text-center pt-[20px]
                                      ${
                                        status === "pending"
                                          ? "bg-[#EC832533] text-[#EC8325]"
                                          : status === "waiting"
                                          ? "bg-[#EC832533] text-[#EC8325]"
                                          : status == "rejected" ||
                                            status == "cancelled"
                                          ? "bg-[#EE313133] text-[#EE3131]"
                                          : status === "accepted"
                                          ? "bg-green-100 text-green-600"
                                          : status === "completed"
                                          ? "bg-[#04AA5133] text-[#00C853]"
                                          : status === "In Progress"
                                          ? "bg-[#00B0FF33] text-[#00B0FF]"
                                          : "bg-gray-100 text-gray-600"
                                      }
    `}
                  >
                    {status === "Pending" ? "Waiting" : status}
                  </div>

                  {status !== "Completed" && (
                    <BookingCountdown bookingRequestDetail={bookingDetail} />
                  )}
                </div>

                {/* Message Button */}
                {status !== "accepted" &&
                  status !== "completed" &&
                  status !== "rejected" && (
                    <button
                      onClick={() => {
                        navigate("/messages", {
                          state: {
                            user: {
                              id: bookingDetail?.service_provider?.id,
                              uid: bookingDetail?.service_provider?.uid,
                              name: bookingDetail?.service_provider?.name,
                              avatar: bookingDetail?.service_provider?.avatar,
                            },
                          },
                        });
                      }}
                      className="w-full bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-3 rounded-lg font-medium mb-6 flex items-center justify-center space-x-2"
                    >
                      <FaEnvelope />
                      <span>Message</span>
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
                      <span className="font-medium">{bookingDetail?.date}</span>
                    </div>
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3">
                      <span className="text-gray-500">Time</span>
                      <span className="font-medium">{bookingDetail?.time}</span>
                    </div>
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3">
                      <span className="text-gray-500">Total Duration</span>
                      <span className="font-medium">
                        {bookingDetail?.duration} hr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Payment */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Total Payment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between border-t-[1px] border-slate-300 pt-3 font-semibold">
                      <span>Total</span>
                      <span>${bookingDetail?.total_payment}</span>
                    </div>
                  </div>
                </div>

                {/* Cancel Button */}
                {status !== "accepted" &&
                  status !== "completed" &&
                  status !== "rejected" &&
                  status !== "cancelled" && (
                    <button
                      className="w-full bg-[#EE3131] text-white py-3 rounded-lg font-medium hover:bg-red-600"
                      onClick={() => {
                        setCancelbooking(true);
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}

                {status === "rejected" && (
                  <div>
                    <h1>Rejection Reason </h1>
                    <p className="bg-[#F6F6F6] p-3 text-sm rounded-2xl mt-1">
                      Lorem ipsum dolor sit amet consectetur. Suspendisse ut
                      scelerisque ipsum dolor tristique donec. Integer
                      suspendisse scelerisque laoreet.
                    </p>
                  </div>
                )}

                {status === "completed" && (
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
                          className="bg-gradient-to-r rounded-xl px-8 from-[#27A8E2] to-[#00034A] text-sm  p-3 text-white"
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
                          onChange={(e) => setCancelReasonText(e.target.value)}
                          rows={4}
                          value={cancelReasonText}
                          placeholder="Write your reason for cancellation..."
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                        />
                      </div>

                      <Button
                        loading={isLoading}
                        text={"Submit"}
                        onClick={() => {
                          handleCancelBooking();
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingdetails;

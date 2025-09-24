import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HeroBg } from "../../../assets/export";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router";
import Filter from "../../global/Filter";
import AcceptedModal from "./AcceptedJobsModal";
import AlreadyTakenModal from "./AlreadyTakenModal";
import {
  AcceptBookingRequest,
  getRequestDetail,
  RejectBookingRequest,
  resetError,
} from "../../../redux/slices/provider.slice";
import { useDispatch, useSelector } from "react-redux";
import { RiLoader5Line } from "react-icons/ri";
import { IoWarning } from "react-icons/io5";
import { TiWarning } from "react-icons/ti";

export default function DiscoverDetail() {
  const navigate = useNavigate("");
  const location = useLocation("");
  const queryParams = new URLSearchParams(location.search);
  const [isFilter, setIsFilter] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isAlready, setIsAlready] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [acceptmodel, setAcceptmodel] = useState(false);
  const dispatch = useDispatch("");
  const [actionType, setActionType] = useState("");
  const { bookingRequestDetail, bookingRequestLoader } = useSelector(
    (state) => state.provider
  );
  const fetchDiscoverJob = async () => {
    await dispatch(
      getRequestDetail(`provider/requests/${queryParams.get("id")}/details`)
    ).unwrap();
    dispatch(resetError());
  };

  useEffect(() => {
    fetchDiscoverJob();
  }, []);

  console.log(bookingRequestDetail, "bookingRequestDetail");

  console.log(selectedItem, "selectedItem");

  const handleacceptjob = async () => {
    try {
      // Dispatch AcceptBookingRequest action to initiate the API call
      await dispatch(
        AcceptBookingRequest(bookingRequestDetail?.request_id)
      ).unwrap();
      setAcceptmodel(false); // Close modal after accepting
      navigate(
        `/discover-job-details?id=${bookingRequestDetail?.request_id}&status=${bookingRequestDetail?.status}`
      );
    } catch (error) {
      console.error("Error accepting booking request:", error);
    }
  };

  const handleRejectRequest = async () => {
    const data = {
      requestId: bookingRequestDetail?.request_id,
      reason: null,
    };

    try {
      await dispatch(RejectBookingRequest(data)).unwrap();
      navigate("/discover-job");
    } catch (error) {
      console.error("Error rejecting booking request:", error);
      navigate("/discover-job");
    }
  };

  return (
    <div>
      <Navbar type="serviceprovider" />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="h-full px-5 lg:px-40   -mt-80 bottom-0 items-center gap-3 ">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate("/discover-job")}>
              <FaArrowLeft color="white" size={16} />
            </button>
            <h1 className="text-2xl font-semibold text-white">Discover Jobs</h1>
          </div>
          <div>
            <div className="flex items-center gap-4 ">
              <div className="relative flex items-center">
                <div className="absolute left-1">
                  <CiSearch color="white" size={20} />
                </div>
                <input
                  type="text"
                  className="bg-[#FFFFFF4D] blur-[40] outline-none p-2 px-8 rounded-[8px] text-white"
                />
              </div>
              <button
                onClick={() => setIsFilter(!isFilter)}
                className="bg-[#FFFFFF4D] text-white p-3 rounded-md"
              >
                <LuSettings2 />
              </button>
            </div>
            <div className="relative top-12 left-20">
              {isFilter && <Filter setIsFilter={setIsFilter} />}
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFA] shadow-lg mb-48 rounded-[8px] p-10 mt-3">
          {/* Service Request Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Header with title and actions */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {bookingRequestDetail.title}
                      </h2>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <CiLocationOn color="#00034A" />
                      {bookingRequestDetail.location}
                    </div>
                  </div>
                  {bookingRequestDetail?.status == "pending" && (
                    <div className="flex gap-4">
                      <button
                        disabled={bookingRequestLoader} // Disable the button while loading
                        type="button"
                        onClick={() => {
                          setActionType("Reject");
                          setSelectedItem(bookingRequestDetail?.request_id); // Assuming this function is defined elsewhere
                          handleRejectRequest(); // Call the function to reject the booking request
                        }}
                        className={`p-2 text-[#000000] flex items-center gap-2 bg-[#F2F1F1] px-8 rounded-lg transition-colors ${
                          bookingRequestLoader
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                      >
                        {/* Show loading spinner if loader is true */}
                        Ignore
                        {bookingRequestLoader && actionType == "Reject" && (
                          <RiLoader5Line className="animate-spin text-lg" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setAcceptmodel(true);
                          setActionType("Accept");
                        }}
                        className="p-2 bg-gradient-to-r flex items-center gap-2 from-[#00034A] to-[#27A8E2] px-6 text-white rounded-lg transition-colors"
                      >
                        Accept Job
                        {bookingRequestLoader && actionType == "Accept" && (
                          <RiLoader5Line className="animate-spin text-lg" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Images */}
                {bookingRequestDetail.images &&
                  bookingRequestDetail.images.length > 0 && (
                    <div className="flex gap-3 mb-4">
                      {bookingRequestDetail.images.map((image, index) => (
                        <div
                          key={index}
                          className="w-40 h-15 bg-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400">
                            <img
                              src={import.meta.env.VITE_APP_AWS_URL + image}
                              alt=""
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {bookingRequestDetail.description}
                </p>

                {/* Price and Date */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-12">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Proposed Price
                      </p>
                      <p className="text-xl font-semibold text-gray-900">
                        {bookingRequestDetail?.total_payment}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Preferred Date & Time
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {bookingRequestDetail?.date}{" "}
                        {bookingRequestDetail?.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {acceptmodel && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => setAcceptmodel(false)}
        >
          <div className="bg-white rounded-lg p-6 w-[80%] sm:w-[30%] shadow-xl">
            <div className="flex justify-center pb-3">
              <div className="w-[70px] h-[70px] rounded-full flex justify-center items-center bg-gradient-to-r from-[#27A8E2] to-[#00034A]">
                <IoWarning size={40} color="white" />
              </div>
            </div>

            <h3 className="text-3xl font-semibold text-center mb-4">
              Confirm Acceptance!
            </h3>
            <p className="text-sm text-center">
              You are about to accept this job. Once accepted, you are expected
              to complete the service as per the job details. Do you want to
              proceed?
            </p>
            <div className="text-center flex justify-center gap-3 mt-10">
              <button
                className="bg-[#F2F1F1] text-black py-2 px-8 rounded-xl"
                onClick={() => setAcceptmodel(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleacceptjob}
                className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 px-8 rounded-xl"
              >
                Accept Now
              </button>
            </div>
          </div>
        </div>
      )}

      <AcceptedModal isOpen={isAccept} setIsOpen={setIsAccept} />
      <AlreadyTakenModal isOpen={isAlready} setIsOpen={setIsAlready} />

      <Footer />
    </div>
  );
}

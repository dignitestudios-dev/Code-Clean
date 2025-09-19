import Modal from "react-modal";
import { HiOutlineXMark, HiXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  AcceptBookingRequest,
  getBookingRequest,
  RejectBookingRequest,
} from "../../../redux/slices/provider.slice";
import { RiLoader2Fill } from "react-icons/ri";
import { Button } from "../../global/GlobalButton";
import { TiWarning } from "react-icons/ti";
import { ErrorToast } from "../../global/Toaster";
const BookingRequestModal = ({ isOpen, setIsOpen, date }) => {
  const [requests, setRequests] = useState([
    {
      id: "ID12345",
      name: "Sophia Rose",
      time: "18:00 AM",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format",
      bgColor: "bg-green-200",
    },
    {
      id: "ID12345",
      name: "Sophia Rose",
      time: "12:00 AM",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face&auto=format",
      bgColor: "bg-pink-200",
    },
    {
      id: "ID12345",
      name: "Sophia Rose",
      time: "08:00 AM",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face&auto=format",
      bgColor: "bg-pink-100",
    },
    {
      id: "ID12345",
      name: "Sophia Rose",
      time: "10:00 AM",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format",
      bgColor: "bg-green-200",
    },
  ]);
  const [selectedId, setSelectedId] = useState("");
  const [isAction, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [rejectedpopup, setRejectedpopup] = useState(false);
  const [rejectedreasons, setRejectedreasons] = useState(false);
  const [rejectedreqcomplete, setRejectedreqcomplete] = useState(false);
  const dispatch = useDispatch();
  const { bookingRequest, isLoading, bookingRequestLoader } = useSelector(
    (state) => state?.provider
  );
  useEffect(() => {
    dispatch(getBookingRequest(`provider/booking/requests?date=${date}`));
  }, [date]);
  const handleApprove = async (index) => {
    await dispatch(AcceptBookingRequest(index));
    dispatch(getBookingRequest(`provider/booking/requests?date=${date}`));
  };

  const handleDecline = () => {
    setRejectedpopup(!rejectedpopup);
    setIsOpen(false);
  };
  const HandleRejectRequest = async () => {
    if (!reason) return ErrorToast("Reason is required");
    const data = {
      requestId: selectedId,
      reason: reason,
    };

    await dispatch(RejectBookingRequest(data)).unwrap();
    setRejectedpopup(false); // Close warning popup
    setRejectedreasons(false); // Close reason popup
    setRejectedreqcomplete(true); // Show success modal
    dispatch(getBookingRequest());
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Page Not Found"
        shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000] "
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
      >
        <div className="bg-white w-[500px] px-4 p-3 rounded-[16px] shadow-lg flex flex-col justify-center gap-3 ">
          <div className="w-full flex justify-between">
            <h3 className="text-[28px] font-bold text-[#181818]">
              Booking Requests
            </h3>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <HiOutlineXMark />
            </button>
          </div>
          <span className="text-[#181818] text-[16px] font-[500]">
            Tuesday, 03
          </span>
          <div className="w-full flex flex-col mt-4 items-center">
            <div className="px-4 pb-6 w-full space-y-4 max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                // Skeleton Loader
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 border border-[#f3f3f3] rounded-[12px] p-4 flex items-center justify-between animate-pulse"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="mb-2 h-3 w-16 bg-gray-200 rounded"></div>
                        <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                      </div>
                      <div>
                        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                ))
              ) : bookingRequest?.length > 0 ? (
                bookingRequest.map((request, index) => (
                  <div
                    key={index}
                    className="bg-[#fafafa] border-[#E8E8E8] border-2  rounded-[12px] p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="mb-2 text-[12px] text-[#353535] font-medium">
                          {request.id}
                        </p>
                        <div
                          className={`w-14 h-14 rounded-full ${request.bgColor} flex items-center justify-center overflow-hidden`}
                        >
                          <img
                            src={
                              import.meta.env.VITE_APP_AWS_URL +
                              request?.user.avatar
                            }
                            alt={request?.user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {request?.user.name}
                        </h3>
                        <p className="text-gray-600">{request.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          handleDecline(request?.request_id);
                          setSelectedId(request?.request_id);
                          setAction("reject");
                        }}
                        disabled={selectedId === request?.request_id} // disable while loading
                        className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                      >
                        {bookingRequestLoader &&
                        isAction == "reject" &&
                        selectedId == request?.request_id ? (
                          <RiLoader2Fill
                            color="white"
                            className="animate-spin text-lg"
                            size={25}
                          />
                        ) : (
                          <HiX size={18} className="text-white" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          handleApprove(request?.request_id);
                          setSelectedId(request?.request_id);
                          setAction("approved");
                        }}
                        disabled={selectedId === request?.request_id}
                        className="w-10 h-10 bg-gradient-to-tr from-[#00034A] to-[#27A8E2] rounded-full flex items-center justify-center transition-colors"
                      >
                        {bookingRequestLoader &&
                        isAction == "approved" &&
                        selectedId == request?.request_id ? (
                          <RiLoader2Fill
                            color="white"
                            className="animate-spin text-lg"
                            size={25}
                          />
                        ) : (
                          <FaCheck size={18} className="text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 pb-6 text-center text-gray-500">
                  No booking requests at the moment.
                </div>
              )}
            </div>

            {bookingRequest.length === 0 && (
              <div className="px-6 pb-6 text-center text-gray-500">
                No booking requests at the moment.
              </div>
            )}
          </div>
        </div>
      </Modal>
      {rejectedpopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 md:w-[30em] shadow-2xl text-center">
            {/* Checkmark Icon */}
            <div className="flex items-center justify-end gap-2">
              <div>
                <button onClick={() => setRejectedpopup(false)}>
                  <HiXMark />
                </button>
              </div>
            </div>
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
            <div className="flex items-center justify-between gap-2 mb-6">
              <h2 className="text-[26px] font-bold text-black text-center ">
                Reject Reason
              </h2>
              <div>
                <button onClick={() => setRejectedreasons(false)}>
                  <HiXMark />
                </button>
              </div>
            </div>
            <label className="block text-sm text-left font-medium text-black mb-1">
              Reason
            </label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Type your reason here..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 text-black resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />

            <div className="flex justify-between gap-4 mt-6">
              <Button
                onClick={HandleRejectRequest}
                text={"Submit"}
                loading={bookingRequestLoader}
              />
            </div>
          </div>
        </div>
      )}

      {rejectedreqcomplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-5 md:w-[26em] shadow-2xl text-center">
            <div className="flex justify-end w-full">
              <button onClick={() => setRejectedreqcomplete(false)}>
                <HiXMark size={25} />
              </button>
            </div>
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
              You have Reject the user request. Thank you for taking action
              promptly!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingRequestModal;

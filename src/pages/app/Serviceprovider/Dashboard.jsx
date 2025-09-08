import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa";
import { HeroBg } from "../../../assets/export";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { CiSearch } from "react-icons/ci";
import { TiWarning } from "react-icons/ti";
import Pagination from "../../../components/global/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  AcceptBookingRequest,
  getBookingRequest,
  RejectBookingRequest,
} from "../../../redux/slices/provider.slice";
import { Button } from "../../../components/global/GlobalButton";
import { ErrorToast } from "../../../components/global/Toaster";
import { HiXMark } from "react-icons/hi2";
import SkeletonRows from "../../../components/global/Skellyton";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Booking Request");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rejectedpopup, setRejectedpopup] = useState(false);
  const [rejectedreasons, setRejectedreasons] = useState(false);
  const [reason, setReason] = useState("");
  const [rejectedreqcomplete, setRejectedreqcomplete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { bookingRequest, bookingRequestLoader,isLoading } = useSelector(
    (state) => state.provider
  );
  useEffect(() => {
    if (activeTab == "Booking Request") {
      dispatch(getBookingRequest("provider/booking/requests"));
    } else {
      dispatch(getBookingRequest("provider/current-bookings"));
    }
  }, [dispatch, activeTab]);
  console.log(statusFilter, "booking request ");

  // Filtered bookings based on search query
  const filteredBookings = Array.isArray(bookingRequest)
    ? bookingRequest
        .filter(
          (booking) =>
            booking?.user?.name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            booking?.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking?.status?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((booking) => {
          if (activeTab === "Booking Request") {
            return (
              booking.status === "pending" ||
              booking.status === "accepted" ||
              booking.status === "rejected"
            );
          } else if (activeTab === "Current Bookings") {
            return (
              booking.status === "inprogress" ||
              booking.status === "waiting" ||
              booking.status === "completed" || // fixed
              booking.status === "canceled" // fixed
            );
          }

          return true;
        })
        .filter((booking) => {
          if (statusFilter == "all") return true;
          return booking.status === statusFilter;
        })
    : [];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const HandleRejectRequest = async () => {
    if (!reason) return ErrorToast("Reason is required");
    const data = {
      requestId: selectedItem,
      reason: reason,
    };

    await dispatch(RejectBookingRequest(data)).unwrap();
    setRejectedpopup(false); // Close warning popup
    setRejectedreasons(false); // Close reason popup
    setRejectedreqcomplete(true); // Show success modal
    dispatch(getBookingRequest());
  };

  return (
    <div>
      <Navbar type="serviceprovider" />

      {/* Hero Section */}
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] z-50"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgba(39, 168, 226, 1) -20.45%, rgba(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex justify-between items-center gap-3 px-4 md:px-28 w-full -mb-10">
          <div className="flex gap-3 items-center">
            <h2 className="text-white text-[28px] font-bold leading-[48px] capitalize">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <CiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                color="white"
                size={20}
              />
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
              {["Booking Request", "Current Bookings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white"
                      : "bg-white text-[#181818]"
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
      <div className="px-4 md:px-28 pt-0  py-[em] bg-[#f5f8fb00] -mt-[14em] relative mb-10">
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          {/* Tabs for Filter */}
          <div className="flex border-b px-6 pt-6">
            {activeTab == "Booking Request"
              ? ["All", "Pending", "Accepted", "Rejected"]?.map(
                  (status, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setStatusFilter(status.toLocaleLowerCase())
                      }
                      className={`px-4 py-2 text-sm font-medium text-[#3F3F3F] hover:text-[#00AEEF] focus:outline-none border-b-2 ${
                        statusFilter === status.toLocaleLowerCase()
                          ? "border-[#00AEEF] text-gradient"
                          : "border-transparent"
                      }`}
                    >
                      {status === "Waiting" ? "Waiting Requests" : status}
                    </button>
                  )
                )
              : ["All", "Upcoming", "In Progress", "Completed", "Canceled"].map(
                  (status, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setStatusFilter(
                          status === "Upcoming"
                            ? "waiting"
                            : status.replaceAll(" ", "").toLowerCase()
                        )
                      }
                      className={`px-4 py-2 text-sm font-medium text-[#3F3F3F] hover:text-[#00AEEF] focus:outline-none border-b-2 ${
                        statusFilter.replaceAll(" ", "").toLowerCase() ===
                          status.replaceAll(" ", "").toLowerCase() ||
                        statusFilter === status ||
                        (status === "Upcoming" && statusFilter === "waiting") // ✅ special case
                          ? "border-[#00AEEF] text-gradient"
                          : "border-transparent"
                      }`}
                    >
                      {status === "waiting"
                        ? "Waiting Requests"
                        : status + " Jobs"}
                    </button>
                  )
                )}
          </div>

          {/* Table */}
          <table className="w-full text-left mt-4">
            <thead>
              <tr className="bg-[#208BC733] text-[#082166] text-sm">
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
              {isLoading ? (
                <SkeletonRows count={6} />
              ) : filteredBookings?.length > 0 ? (
                filteredBookings.map((row, index) => (
                  <tr
                    key={index}
                    className="border-t cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/job-details?id=${row?.request_id}&status=${
                          row?.status
                        }&type=${
                          activeTab == "Booking Request"
                            ? `provider/requests/${row?.request_id}/details`
                            : `provider/bookings/${row?.booking_id}/details`
                        }`
                      )
                    }
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={`http://family-phys-ed-s3.s3.amazonaws.com/${row?.user?.avatar}`}
                        alt={row?.user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {row?.user?.name}
                    </td>
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4">{row.time}</td>
                    <td className="px-6 py-4">{row.duration}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${
                          row.status === "accepted" || row.status == "completed"
                            ? "text-[#00C853]"
                            : row.status === "pending" ||
                              row.status == "waiting"
                            ? "text-[#EC8325]"
                            : row.status === "inprogress" ||
                              row.status == "In Progress Jobs"
                            ? "text-[#208BC7]"
                            : "text-[#EE3131]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-2 text-[#00AEEF] cursor-pointer text-center">
                      {row.status === "pending" ? (
                        <div className="flex gap-3">
                          <button
                            className="bg-[#EE3131] text-white px-6 py-3 rounded-xl"
                            onClick={(e) => {
                              setSelectedItem(row?.request_id);
                              e.stopPropagation();
                              setRejectedpopup(true);
                            }}
                          >
                            Reject
                          </button>

                          <Button
                            text={"Accept"}
                            onClick={(e) => {
                              setSelectedItem(index);
                              e.stopPropagation();
                              dispatch(AcceptBookingRequest(row.request_id));
                              dispatch(
                                getBookingRequest("provider/booking/requests")
                              );
                            }}
                            loading={
                              selectedItem == index && bookingRequestLoader
                            }
                          />
                        </div>
                      ) : (
                        <span>&gt;</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
              You have Reject the user request. Thank you for taking action
              promptly!
            </p>
          </div>
        </div>
      )}

      <Pagination filteredBookings={filteredBookings} />

      <Footer />
    </div>
  );
};

export default Dashboard;

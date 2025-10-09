import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { HeroBg } from "../../../assets/export";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookinghistory,
  fetchBookingRequest,
  fetchCurrentBooking,
} from "../../../redux/slices/users.slice";
import Pagination from "../../../components/global/Pagination";

const PLACEHOLDER_AVATAR = "https://via.placeholder.com/40";

// Tiny spinner for headers/buttons
const Spinner = () => (
  <span
    className="inline-block h-4 w-4 ml-2 align-middle animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
    aria-label="Loading"
  />
);

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

const Bookingsrequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookingrequest, setBookingrequest] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Current Bookings");
  const [statusFilter, setStatusFilter] = useState("All");
  const { currentbookingdata, currentbookingLoading, requestbookingdata } =
    useSelector((s) => s.user);
  const loading = !!currentbookingLoading;
  useEffect(() => {
    dispatch(fetchBookingRequest("/user/booking/requests"));
  }, [dispatch]);

  useEffect(() => {
    if (requestbookingdata) {
      setBookingrequest(requestbookingdata);
    }
  }, [requestbookingdata]);


  useEffect(() => {
    dispatch(fetchCurrentBooking("/user/current-bookings"));
  }, [dispatch]);

  const isCurrent = activeTab === "Current Bookings";

  // ---- helpers ----
  const toUiStatus = (raw) => {
    const s = String(raw || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/_/g, "");
    if (s === "inprogress") return "In Progress Job";
    if (s === "completed") return "Completed Jobs";
    if (s === "cancelled" || s === "canceled") return "Canceled Jobs";
    if (s === "accepted") return "Approved";
    if (s === "rejected") return "Rejected";
    if (s === "pending") return "Pending";
    if (["accepted", "approved", "pending"].includes(s)) return "Upcoming Jobs";
    return "Upcoming Jobs";
  };

  const statusColor = (statusUi) => {
    const s = (statusUi || "").toLowerCase();
    if (
      s.includes("completed") ||
      s.includes("approved") ||
      s.includes("accepted")
    )
      return "text-[#00C853]";
    if (s.includes("upcoming") || s.includes("pending"))
      return "text-[#EC8325]";
    if (s.includes("progress")) return "text-[#208BC7]";
    return "text-[#EE3131]";
  };

  const fmtIsoDate = (iso) => (iso ? new Date(iso).toLocaleDateString() : "");
  const fmtIsoTime = (iso) =>
    iso
      ? new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      : "";

  // ---- normalize API payload (supports {data:[...]} OR [...] OR {...}) ----
  const apiList = useMemo(() => {
    const payload = currentbookingdata;
    if (!payload) return [];
    if (Array.isArray(payload?.data)) return payload.data; // paginated shape
    if (Array.isArray(payload)) return payload; // array
    return [payload]; // single object
  }, [currentbookingdata]);

  // ---- static for Booking Request tab (optional) ----
  const bookings = useMemo(() => {
    if (!bookingrequest) return [];
    return bookingrequest?.data || []; // Extract data from the response object
  }, [bookingrequest]);


  // ---- unify into UI rows ----
  const uiRows = useMemo(() => {
    if (isCurrent) {
      return apiList.map((item) => {
        // New API shape
        const providerNew = item?.service_provider;
        // Old shape fallback
        const sr = item?.service_request;
        const providerOld = sr?.provider;

        const id = item?.booking_id ?? item?.id ?? "-";
        const name = providerNew?.name || providerOld?.name || "Unknown";
        const avatar =
          providerNew?.avatar || providerOld?.avatar || PLACEHOLDER_AVATAR;

        // Prefer new strings, else ISO fallback
        const dateStr = item?.date || fmtIsoDate(sr?.date) || "";
        const timeStr = item?.time || fmtIsoTime(sr?.time) || "";

        const durationStr =
          (item?.duration ? `${item.duration} hrs` : null) ||
          (sr?.duration ? `${sr.duration} hrs` : "-");

        const statusRaw = item?.status || sr?.status || "";
        const statusUi = toUiStatus(statusRaw);

        return {
          id,
          name,
          avatar,
          dateStr,
          timeStr,
          durationStr,
          statusUi,
          statusRaw,
        };
      });
    } else {
      // Booking Request tab (static)
      return bookings.map((b) => ({
        id: b.request_id,
        name: b.service_provider?.name,
        avatar: b.service_provider?.avatar || PLACEHOLDER_AVATAR,
        dateStr: b?.date || "",
        timeStr: b?.time || "",
        durationStr: b?.duration || "-",
        statusUi: toUiStatus(b?.status),
        statusRaw: b?.status || "",
      }));
    }
  }, [isCurrent, apiList, bookings]);

  const statusOptions = isCurrent
    ? ["All", "Upcoming Jobs", "In Progress Job"]
    : ["All", "Pending", "Approved", "Rejected"];

  const q = searchQuery.trim().toLowerCase();

  const filteredRows = uiRows
    .filter((row) => {
      if (!q) return true;
      return (
        row.name?.toLowerCase().includes(q) ||
        row.dateStr?.toLowerCase().includes(q) ||
        row.statusUi?.toLowerCase().includes(q)
      );
    })
    .filter((row) => {
      if (statusFilter === "All") return true;
      return row.statusUi === statusFilter;
    });

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
      if (activeTab == "Current Bookings") {
        dispatch(fetchCurrentBooking(cleanUrl));
      } else {
        dispatch(fetchBookingRequest(cleanUrl));
      }
    }
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
        <div className="flex justify-between w-full items-center gap-3 px-8 lg:px-40 -mb-10 flex-wrap">
          <div className="flex gap-3 items-center w-full sm:w-auto">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft color="white" size={20} />
            </button>
            <h2 className="text-white text-[24px] sm:text-[28px] font-bold leading-[48px] capitalize">
              {isCurrent ? "Current Bookings" : "Booking Requests"}
              {loading && <Spinner />}
            </h2>
          </div>

          <div className="md:flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
            <div className="relative w-full sm:w-[260px]">
              <CiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                color="white"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for bookings"
                disabled={loading}
                className={`w-full py-3 pl-10 pr-5 rounded-lg border !text-white border-[#ccc] bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              />
            </div>

            {/* Tab Switch */}
            <div className="flex gap-4 bg-white rounded-xl p-[6px] text-sm flex-wrap sm:w-auto w-full mt-4 sm:mt-0">
              {["Current Bookings", "Booking Request"].map((tab) => (
                <button
                  key={tab}
                  disabled={loading}
                  onClick={() => {
                    setStatusFilter("All");
                    setActiveTab(tab);
                  }}
                  className={`px-4 py-2 rounded-lg w-full sm:w-auto ${activeTab === tab
                    ? "bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white"
                    : "bg-white text-text-[#181818]"
                    } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Booking Table Section */}
      <div className="px-10 lg:px-[10em] py-[4em] bg-[#f5f8fb00] -mt-[16em] relative mb-10">
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          {/* Status Filter Row */}
          <div className="flex border-b px-6 pt-6">
            {statusOptions.map((status, index) => (
              <button
                key={index}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 text-sm font-medium hover:text-[#00AEEF] focus:outline-none border-b-2 ${statusFilter === status
                  ? "border-[#00AEEF] text-gradient"
                  : "border-transparent text-[#3F3F3F]"
                  }`}
              >
                {status}
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

            <tbody className="text-sm text-[#3F3F3F]" aria-busy={loading}>
              {loading ? (
                <SkeletonRows count={6} />
              ) : (
                <>
                  {filteredRows.map((row, index) => (
                    <tr
                      key={row.id ?? index}
                      className="border-t cursor-pointer"
                      // onClick={() =>
                      //   navigate(
                      //     `/booking-request?id=${row.id}&status=${row.statusUi}`
                      //   )
                      // }
                      onClick={() => {
                        const navigateTo = activeTab === "Current Bookings"
                          ? `/booking-details?id=${row.id}&status=${row.statusUi}`
                          : `/booking-request?id=${row.id}&status=${row.statusUi}`;
                        navigate(navigateTo);
                      }}
                    >
                      <td className="px-6 py-4">{row.id}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={
                            row?.avatar
                              ? `${import.meta.env.VITE_APP_AWS_URL + row?.avatar
                              }`
                              : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
                          }
                          alt={row.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {row.name}
                      </td>
                      <td className="px-6 py-4">{row.dateStr}</td>
                      <td className="px-6 py-4">{row.timeStr}</td>
                      <td className="px-6 py-4">{row.durationStr}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${statusColor(
                            row.statusUi
                          )}`}
                        >
                          {row.statusUi}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#00AEEF] cursor-pointer">
                        <span>&gt;</span>
                      </td>
                    </tr>
                  ))}

                  {filteredRows.length === 0 && (
                    <tr>
                      <td
                        className="px-6 py-10 text-center text-[#888]"
                        colSpan={7}
                      >
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        links={
          activeTab == "Current Bookings"
            ? currentbookingdata?.links
            : requestbookingdata?.links
        }
        onPageChange={handlePageChange}
      />

      <Footer />
    </div>
  );
};

export default Bookingsrequests;

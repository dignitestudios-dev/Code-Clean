import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { HeroBg } from "../../../assets/export";
import BookingRequestModal from "./BookingRequestModal";
import AppointmentBookModal from "./AppointmentBookModal";
import BookingAvaliable from "./BookingAvaliableModal";
import { useDispatch, useSelector } from "react-redux";
import { getCalendar } from "../../../redux/slices/provider.slice";

const calendarData = {
  "2025-01-03": {
    bookingRequests: 8,
    upcomingJobs: 3,
  },
  "2025-01-11": {
    upcomingJobs: 8,
  },
  "2025-01-18": {
    upcomingJobs: 8,
  },
  "2025-07-01": {
    bookingRequests: 4,
    upcomingJobs: 8,
  },
};

const AppointmentCalendar = () => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.startOf("month"));
  const navigate = useNavigate("");
  const startDay = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const [isModal, setIsModal] = useState("");
  const [isOpen, setIsOpen] = useState("");
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState();
  const { CalendarBooking, isLoading } = useSelector(
    (state) => state?.provider
  );
  const weeks = [];
  console.log(CalendarBooking, "calendarBooking");
  let currentDay = 1 - startDay;
  useEffect(() => {
    dispatch(getCalendar());
  }, [dispatch]);
  while (currentDay <= daysInMonth) {
    const week = Array(7)
      .fill(null)
      .map((_, i) => {
        const day = currentDay + i;
        return day > 0 && day <= daysInMonth ? day : null;
      });
    weeks.push(week);
    currentDay += 7;
  }

  const renderCellContent = (day) => {
    if (!day) return null;

    const dateKey =
      currentMonth.format("YYYY-MM") + `-${String(day).padStart(2, "0")}`;

    // ✅ Safe lookup
    const data = CalendarBooking?.bookings?.[dateKey];

    console.log(day, dateKey, "data-comes");

    return (
      <div className="relative p-1 text-sm overflow-y-auto h-full">
        <div
          onClick={() => {
            setIsModal("avaliable");
            setIsOpen(!isOpen);
            setSelectedDate(dateKey);
          }}
          className="font-semibold cursor-pointer mb-1 text-end"
        >
          {String(day).padStart(2, "0")}
        </div>
        <div className="mt-4">
          {data &&
            data?.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  item?.type == "Upcoming Jobs"
                    ? setIsModal("book")
                    : setIsModal("request");
                  setIsOpen(!isOpen);
                  setSelectedDate(dateKey);
                }}
                className={`text-[10px] cursor-pointer ${
                  item?.type == "Upcoming Jobs"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-blue-100 text-blue-600"
                } mt-1 px-1 py-[2px] rounded-sm`}
              >
                {item?.type} ({String(item?.count).padStart(2, "0")})
              </div>
            ))}
        </div>
      </div>
    );
  };

  const goToPreviousMonth = async () => {
    const monthGet = currentMonth.clone().subtract(1, "month");

    // Format as YYYY-MM
    const formattedMonth = monthGet.format("YYYY-MM");
    console.log(formattedMonth, "formatted");

    await dispatch(getCalendar(formattedMonth));

    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const goToNextMonth = async () => {
    const monthGet = currentMonth.clone().add(1, "month");
    // Format as YYYY-MM
    const formattedMonth = monthGet.format("YYYY-MM");
    console.log(formattedMonth, "formatted");

    await dispatch(getCalendar(formattedMonth));

    setCurrentMonth((prev) => prev.clone().add(1, "month"));
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
      <div className="h-full px-10 lg:px-40   -mt-80 bottom-0 items-center gap-3 ">
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate("/app/landing")}>
            <FaArrowLeft color="white" size={16} />
          </button>
          <h1 className="text-2xl font-semibold text-white">Calendar</h1>
        </div>
        <div className="bg-[#F9FAFA] shadow-lg flex flex-col gap-3 mb-48 rounded-[8px] p-4 mt-3">
          <div className="flex justify-between w-full max-w-md mx-auto items-center px-4 py-4 text-xl font-semibold ">
            <button
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2]"
              onClick={goToPreviousMonth}
            >
              &lt;
            </button>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2]">
              {currentMonth.format("MMMM YYYY")}
            </div>
            <button
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2]"
              onClick={goToNextMonth}
            >
              &gt;
            </button>
          </div>
          {/* Calendar Grid */}
          {isLoading ? (
            // Skeleton Loader
            <div className="grid grid-cols-7 -mt-3 border-t border-[#f3f3f3] animate-pulse">
              {Array.from({ length: 42 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border border-[#f3f3f3] h-28 p-2 bg-gray-200 rounded-sm"
                >
                  <div className="h-4 w-6 bg-white rounded mb-2"></div>
                  <div className="h-3 w-16 bg-white rounded mb-1"></div>
                  <div className="h-3 w-12 bg-white rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 -mt-3 border-t border-[#d8d8d8]">
              {weeks.map((week, wIdx) =>
                week.map((day, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    className="border border-[#d8d8d8] h-28 p-1 text-xs overflow-y-auto"
                  >
                    {renderCellContent(day)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {isModal == "request" && (
        <BookingRequestModal
          date={selectedDate}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {isModal == "book" && (
        <AppointmentBookModal
          date={selectedDate}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {isModal == "avaliable" && (
        <BookingAvaliable
          date={selectedDate}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <Footer />
    </div>
  );
};

export default AppointmentCalendar;

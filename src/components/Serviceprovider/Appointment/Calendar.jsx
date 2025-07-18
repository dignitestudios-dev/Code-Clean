import React, { useState } from "react";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { HeroBg } from "../../../assets/export";
import BookingRequestModal from "./BookingRequestModal";
import AppointmentBookModal from "./AppointmentBookModal";
import BookingAvaliable from "./BookingAvaliableModal";

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

  const weeks = [];
  let currentDay = 1 - startDay;

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
    const dateKey = currentMonth.format("YYYY-MM") + `-${String(day).padStart(2, "0")}`;
    const data = calendarData[dateKey];

    return (
      <div className="relative p-1 text-sm overflow-y-auto h-full">
        <div onClick={() => {
          setIsModal("avaliable");
          setIsOpen(!isOpen);
        }}
          className="font-semibold cursor-pointer mb-1 text-end">{String(day).padStart(2, "0")}</div>
        <div className="mt-4" >
          {data?.bookingRequests && (
            <div onClick={() => {
              setIsModal("request");
              setIsOpen(!isOpen);
            }} className="text-[10px] cursor-pointer bg-blue-100 text-blue-600 mt-1 px-1 py-[2px] rounded-sm">
              Booking Request ({String(data.bookingRequests).padStart(2, "0")})
            </div>
          )}
          {data?.upcomingJobs && (
            <div onClick={() => {
              setIsModal("book");
              setIsOpen(!isOpen);
            }} className="text-[10px] cursor-pointer bg-orange-100 text-orange-600 mt-1 px-1 py-[2px] rounded-sm">
              Upcoming Jobs ({String(data.upcomingJobs).padStart(2, "0")})
            </div>
          )}
        </div>
      </div>
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  return (


    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
      </div>
      <div className='h-full px-40   -mt-80 bottom-0 items-center gap-3 '>
        <div className='flex items-center gap-2 mb-6'>
          <button type="button" onClick={() => navigate("/app/landing")} >
            <FaArrowLeft color='white' size={16} />
          </button>
          <h1 className="text-2xl font-semibold text-white">Calendar</h1>
        </div>
        <div className='bg-[#F9FAFA] shadow-lg flex flex-col gap-3 mb-48 rounded-[8px] p-4 mt-3' >
          <div className="flex justify-between w-full max-w-md mx-auto items-center px-4 py-4 text-xl font-semibold ">
            <button className="text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2]" onClick={goToPreviousMonth}>&lt;</button>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2]" >{currentMonth.format("MMMM YYYY")}</div>
            <button className="text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2]" onClick={goToNextMonth}>&gt;</button>
          </div>
          <div className="grid grid-cols-7 bg-[#208BC733]  text-sm font-semibold mb-0 ">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <div className="py-2 text-center text-transparent border-l-2 border-[#d8d8d8] bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2]" key={day}>
                {day}
              </div>
            ))}
          </div>
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
        </div>
      </div>


      {isModal == "request" && <BookingRequestModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isModal == "book" && <AppointmentBookModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isModal == "avaliable" && <BookingAvaliable isOpen={isOpen} setIsOpen={setIsOpen} />}

      <Footer />
    </div>


  );
};

export default AppointmentCalendar;

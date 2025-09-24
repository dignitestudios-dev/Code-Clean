import { useEffect, useState } from "react";

export default function BookingCountdown({ bookingRequestDetail }) {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
 console.log(bookingRequestDetail,"time remaining")
  // Helper: Parse "30 Sep, 2025" + "13:00 PM" safely into a Date
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
      modifier = null; // handle "13:00 PM"
    }

    date.setHours(hours);
    date.setMinutes(minutes || 0);
    date.setSeconds(0);

    return date;
  };

  useEffect(() => {
    if (!bookingRequestDetail?.date || !bookingRequestDetail?.time) return;

    const bookingDateTime = parseBookingDateTime(
      bookingRequestDetail.date,
      bookingRequestDetail.time
    );

    if (!bookingDateTime) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = bookingDateTime - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = String(
          Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");

        setTimeLeft(`${days} days : ${hours} hrs : ${minutes} mins`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingRequestDetail]);

  if (
    bookingRequestDetail?.status === "completed" ||
    bookingRequestDetail?.status === "Pending"
  ) {
    return null;
  }

  return (
    <div className="flex text-[#808080] text-nowrap items-center justify-center h-[60px] border-2 px-2  rounded-[8px] text-[14px] font-bold mb-2 w-full text-center">
      {timeLeft} {/* Format = days:hours:minutes */}
    </div>
  );
}

import React, { useState } from "react";

export default function AddAvailabilityModal({ onClose, onSave, edit }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [error, setError] = useState("");

  const [workingDays, setWorkingDays] = useState({
    all: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  const toggleDay = (day) => {
    if (day === "all") {
      const allChecked = !workingDays.all;
      const updated = Object.keys(workingDays).reduce((acc, d) => {
        acc[d] = allChecked;
        return acc;
      }, {});
      setWorkingDays(updated);
    } else {
      setWorkingDays((prev) => ({ ...prev, [day]: !prev[day], all: false }));
    }
  };

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const validateTimes = (start, end) => {
    // Convert HH:mm to Date objects (same day for comparison)
    const today = new Date().toDateString();

    const startDate = new Date(`${today} ${start}`);
    const endDate = new Date(`${today} ${end}`);

    if (endDate <= startDate) {
      setError("End time must be after start time.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateTimes(startTime, endTime)) return;

    const selectedDays = days.filter((day) => workingDays[day]);
    onSave({
      start_time: startTime,
      end_time: endTime,
      days: selectedDays,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {edit ? "Edit Availability" : "Add Availability"}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-[#BEBEBE] rounded-lg p-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-[#BEBEBE] rounded-lg p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Select Working Days</h3>
          <div className="flex items-center mt-4 justify-between mb-5">
            <span>All Days</span>
            <input
              type="checkbox"
              className="toggle-checkbox"
              checked={workingDays.all}
              onChange={() => toggleDay("all")}
            />
          </div>
          {days.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between mb-5 capitalize"
            >
              <span>{day}</span>
              <input
                type="checkbox"
                className="toggle-checkbox"
                checked={workingDays[day]}
                onChange={() => toggleDay(day)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 rounded-xl text-white font-semibold"
          style={{
            background:
              "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

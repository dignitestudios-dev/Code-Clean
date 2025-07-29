import React from "react";

export default function Feedback({setReportUser}) {
  return (
    <div className="bg-[#F6F6F6] p-3 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[17px] font-[600] text-[#181818]">Feedback</h2>
        <button onClick={()=>setReportUser(true)} className="text-[#EE3131] text-[10px] underline font-medium hover:text-red-600 transition-colors">
          Report User
        </button>
      </div>

      <div className="mb-1">
        <h3 className="text-[10px] font-semibold text-[#181818]">John Doe</h3>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((star) => (
            <svg
              key={star}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <svg
            className="w-5 h-5 text-gray-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span className="text-[14px] font-medium text-[#181818]">4.0</span>
      </div>

      <p className="text-[#6F6F6F] text-[12px] leading-relaxed">
        The standard Lorem Ipsum passage, used since the Lorem ipsum dolor sit
        amet, elit sed do labore et dolore magna aliqua.
      </p>
    </div>
  );
}

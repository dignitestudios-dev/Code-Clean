import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ filteredBookings }) {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfessionals = filteredBookings?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      {" "}
      <div className="flex justify-center  gap-2">
        <div className=" flex gap-3 bg-white shadow-2xl rounded-xl">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-[16px] text-[#B7B7B7] font-[500]  rounded-md  flex items-center gap-2"
          >
            <FaChevronLeft size={10} />
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2  ${
                currentPage === i + 1
                  ? "bg-[#F5FCFF]  text-[#00034A] border-2 border-[#E3E3E3] bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 h-[25px] mt-2 border-l border-[#00000021] bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent flex items-center gap-2  "
          >
            Next
            <FaChevronRight color="#00034A" size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

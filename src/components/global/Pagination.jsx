import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ links, onPageChange }) {
  console.log(links,"linksfsd")
  return (
    <div className="flex justify-center gap-2">
      <div className="flex gap-3 bg-white shadow-2xl rounded-xl px-2 py-1">
        {links?.map((item, i) => (
          <button
            key={i}
            onClick={() => item.url && onPageChange(item.url)}
            disabled={item.active}
            className={`px-4 py-2 text-[16px] font-[500] rounded-md flex items-center gap-2 transition-colors
              ${
                item.active
                  ? "bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent border-2 border-[#27A8E2]"
                  : "text-[#B7B7B7] hover:text-[#00034A]"
              }
              disabled:opacity-50
            `}
          >
            {item.label === "&laquo; Previous" && <FaChevronLeft size={10} />}
            <span dangerouslySetInnerHTML={{ __html: item.label }} />
            {item.label === "Next &raquo;" && <FaChevronRight size={10} />}
          </button>
        ))}
      </div>
    </div>
  );
}

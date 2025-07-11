import { useContext } from "react";

const FAQList = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={`faq ${
        faq.open ? "open" : ""
      }  p-4 mb-4 rounded-[5px] px-10 py-4 shadow-sm border-b border-[#8B8B8B]`}
      key={index}
    >
      <div
        className={`faq-question font-[400] text-[#8B8B8B] text-[18px] relative pr-20 transition-all duration-400 `}
      >
        {faq.question}
        <div
          onClick={() => toggleFAQ(index)}
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-7 h-7 transition-all duration-200 cursor-pointer`}
        >
          {faq.open ? (
             <h3 className="text-[30px] text-[#8B8B8B]">-</h3>
          ) : (
            <h3 className="text-[30px] text-[#8B8B8B]">+</h3>
          )}
        </div>
      </div>
      <div
        className={`faq-answer font-[400] mt-3 text-[18px] text-[#8B8B8B] opacity-0 max-h-0 overflow-hidden transition-all duration-200 ${
          faq.open ? "opacity-100 max-h-[1000px]" : ""
        }`}
      >
        {faq.answer}
      </div>
    </div>
  );
};

export default FAQList;

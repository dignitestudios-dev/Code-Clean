import { useContext, useState } from "react";
import FAQList from "./FaqList";

export default function Faq() {
  const [faqs, setFaqs] = useState([
    {
      question:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum ",
      answer:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum ",
      open: true,
    },
    {
      question:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum ",
      answer:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum .",
      open: false,
    },
    {
      question:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum ",
      answer:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum .",
      open: false,
    },
    {
      question:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum ",
      answer:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum .",
      open: false,
    },
    {
      question:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum ",
      answer:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum .",
      open: false,
    },
    {
      question:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum ",
      answer:
        "Lorem Ipsum es simplemente el texto de relleno de las  Lorem Ipsum el texto de relleno de las  Lorem Ipsum .",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="w-full mt-24 relative px-4 md:px-10 lg:px-48 ">
      <div>
        <h3 className={`text-center font-[700] text-[48px] leading-[52px] `}>
          Frequently Asked <span className="text-[#26A7E2]" > Questions</span>
        </h3>
        <div className="faqs mt-10">
          {faqs.map((faq, index) => (
            <FAQList
              faq={faq}
              index={index}
              key={index}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

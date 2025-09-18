import { useContext, useState } from "react";
import FAQList from "./FaqList";

export default function Faq() {
  const [faqs, setFaqs] = useState([
    // General Questions About the Service
    {
      question:
        "Do you offer residential, commercial, or both types of cleaning?",
      answer: "We offer both types of cleaning.",
      open: true,
    },
    {
      question: "Do you provide deep cleaning or move-in/move-out services?",
      answer:
        "Yes, we provide deep cleaning. However move-in/move-out services vary.",
      open: false,
    },
    {
      question: "Do you bring your own cleaning supplies and equipment?",
      answer: "Yes, we provide our own cleaning supplies and equipment.",
      open: false,
    },
    {
      question:
        "Are your cleaning products eco-friendly or safe for pets/children?",
      answer:
        "Yes, some of our products used are both eco-friendly and pets/children safe.",
      open: false,
    },

    // Team & Trust
    {
      question: "Are your cleaners background-checked and insured?",
      answer: "Yes, they are background-checked and insured.",
      open: false,
    },
    {
      question: "Will I have the same cleaner each time?",
      answer:
        "It is not guaranteed you will have the same cleaner each time. However, it can be requested.",
      open: false,
    },
    {
      question: "How experienced are your cleaning staff?",
      answer: "Our cleaners will have a profile displaying experience.",
      open: false,
    },
    {
      question: "Do you train your cleaning professionals?",
      answer:
        "No, our cleaning professionals are already trained and have had prior experience.",
      open: false,
    },

    // Booking & Scheduling
    {
      question:
        "Can I schedule recurring cleanings (weekly, bi-weekly, monthly)?",
      answer: "Yes, following the subscription policies.",
      open: false,
    },
    {
      question: "What is your cancellation or rescheduling policy?",
      answer:
        "Rescheduling or cancellations must be done at least 24 hours in advance. If not, fees may apply.",
      open: false,
    },
    {
      question: "How far in advance do I need to book?",
      answer:
        "Ideally, the maximum is a month and the minimum is 24 hours in advance.",
      open: false,
    },

    // Pricing & Payments
    {
      question: "Are there any hidden fees?",
      answer: "No, there are no hidden fees.",
      open: false,
    },

    // Policies & Guarantees
    {
      question:
        "What happens if something is damaged or broken during cleaning?",
      answer:
        "A complaint form will be filed, reviewed, and the necessary precautions will be taken.",
      open: false,
    },
    {
      question: "Can I request special instructions or exclusions?",
      answer: "Yes, you are able to request if needed.",
      open: false,
    },

    // Customer Interaction & Customization
    {
      question: "Can I customize my cleaning plan?",
      answer:
        "Yes, you are able to customize your cleaning plan to better suit your needs.",
      open: false,
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer:
        "No, no need to be home. However property directions will need to be given to the cleaner.",
      open: false,
    },
    {
      question: "How do you handle customer feedback or complaints?",
      answer:
        "We take every feedback given into accountability to continue to make Code Clean the service for you!",
      open: false,
    },

    // FAQs to Build Trust & Clarity
    {
      question: "Do I need to do anything to prepare before you arrive?",
      answer: "No, there's no preparation needed.",
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
    <div id="faq" className="w-full mt-24 relative px-4 md:px-10 lg:px-48 ">
      <div>
        <h3 className={`text-center font-[700] text-[48px] leading-[52px] `}>
          Frequently Asked <span className="text-[#26A7E2]"> Questions</span>
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

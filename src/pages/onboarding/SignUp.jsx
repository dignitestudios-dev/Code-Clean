import React, { useState } from "react";
import OnboardingStepper from "../../components/onboarding/OnboardingStepper";
import RegisterForm from "../../components/onboarding/RegisterForm";
import { FaUser, FaEnvelope, FaFileAlt, FaCreditCard } from "react-icons/fa";
import Verification from "./Verification";
import PersonalDetail from "./PersonalDetail";
import AddStripeAccount from "./AddStripeAccount";
import SuccessFullyAccountCreated from "./SuccessFullyAccountCreated";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);

  const stepData = [
    {
      icon: FaUser,
      title: "Your details",
    },
    {
      icon: FaEnvelope,
      title: "Verify email",
    },
    {
      icon: FaFileAlt,
      title: "Personal details",
    },
    {
      icon: FaCreditCard,
      title: "Payment Method",
    },
  ];

  const steps = stepData.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    active: index === currentStep,
  }));

  const handleNext = () => {
    if (currentStep < steps.length) {
      // allow step 4
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 w-full h-auto">
      <OnboardingStepper steps={steps} currentStep={currentStep} />
      <div className="col-span-9 h-full flex justify-center items-center">
        <div className="h-full">
          {currentStep == 0 ? (
            <RegisterForm handleNext={handleNext} />
          ) : currentStep == 1 ? (
            <Verification handleNext={handleNext} />
          ) : currentStep == 2 ? (
            <PersonalDetail handleNext={handleNext} />
          ) : currentStep == 3 ? (
            <AddStripeAccount handleNext={handleNext} />
          ) : (
            <SuccessFullyAccountCreated />
          )}

          <div className={`mt-3 flex items-center justify-center  gap-3`}>
            {steps?.map((el, i) => (
              <div
                key={i}
                className={`w-[90px] h-1 rounded-[200px] transition-all duration-500
                          ${
                            el.completed || el.active
                              ? "bg-[linear-gradient(234.85deg,_#27A8E2_-20.45%,_#00034A_124.53%)]"
                              : "bg-[#D9D9D9]"
                          }
                        `}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

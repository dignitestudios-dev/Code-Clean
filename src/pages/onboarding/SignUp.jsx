import React, { useState } from "react";
import { useLocation } from "react-router";
import OnboardingStepper from "../../components/onboarding/OnboardingStepper";
import RegisterForm from "../../components/onboarding/RegisterForm";
import Verification from "./Verification";
import PersonalDetail from "./PersonalDetail";
import AddStripeAccount from "./AddStripeAccount";
import SuccessFullyAccountCreated from "./SuccessFullyAccountCreated";

import { FaUser, FaCreditCard, FaList, FaCheckCircle } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { LiaIdCard } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { PiCertificateBold } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa6";
import { RiFileList2Line, RiMoneyDollarBoxLine } from "react-icons/ri";
import ProviderDetail from "./ProviderDetail";
import AddServicesForm from "./AddService";
import AddCertification from "./AddCertification";
import IdentityVerification from "./IdentitfyVerification";
import SubscriptionPlans from "./SubscriptionPlan";
import BillingSummary from "./BillingSummary";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
export default function SignUp() {
  const location = useLocation();
  const role = location.state?.role || "user";
  const startAtStep = location.state?.startAtStep || 0; // Ye line add karo
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(startAtStep); 
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
 

  // Step Data for Service Provider
  const providerSteps = [
    { icon: FaUser, title: "Your details" },
    { icon: IoMailOutline, title: "Verify email" },
    { icon: LiaIdCard, title: "Personal details" },
    { icon: RiFileList2Line, title: "List of Services" },
    { icon: PiCertificateBold, title: "Certification" },
    { icon: MdOutlineVerified, title: "ID Verification" },
    { icon: RiMoneyDollarBoxLine, title: "Subscription Plan" },
    { icon: MdOutlinePayment, title: "Payment Method" },
  ];

  // Step Data for Regular User
  const userSteps = [
    { icon: FaUser, title: "Your details" },
    { icon: IoMailOutline, title: "Verify email" },
    { icon: LiaIdCard, title: "Personal details" },
    { icon: RiMoneyDollarBoxLine, title: "Subscription Plan" },
    { icon: MdOutlinePayment, title: "Payment Method" },
  ];

  const stepData = role === "provider" ? providerSteps : userSteps;

  const steps = stepData.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    active: index === currentStep,
  }));

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 w-full  h-auto">
      <OnboardingStepper steps={steps} currentStep={currentStep} />
      <div className="md:col-span-9 col-span-12 h-full flex justify-center items-center">
        <div className="h-full w-full">
          {role == "user" ? (
            currentStep === 0 ? (
              <RegisterForm
                role={"user"}
                setEmail={setEmail}
                handleNext={handleNext}
              />
            ) : currentStep === 1 ? (
              <Verification email={email} handleNext={handleNext} />
            ) : currentStep === 2 ? (
              <PersonalDetail handleNext={handleNext} />
            ) : currentStep === 3 ? (
              <SubscriptionPlans handleNext={handleNext} />
            ) : currentStep === 4 ? (
              <Elements stripe={stripePromise}>
                <AddStripeAccount handleNext={handleNext} />
              </Elements>
            ) : (
              <SuccessFullyAccountCreated />
            )
          ) : currentStep === 0 ? (
            <RegisterForm
              role={"service_provider"}
              setEmail={setEmail}
              handleNext={handleNext}
            />
          ) : currentStep === 1 ? (
            <Verification email={email} handleNext={handleNext} />
          ) : currentStep === 2 ? (
            <ProviderDetail handleNext={handleNext} />
          ) : currentStep === 3 ? (
            <AddServicesForm handleNext={handleNext} />
          ) : currentStep === 4 ? (
            <AddCertification handleNext={handleNext} />
          ) : currentStep === 5 ? (
            <IdentityVerification handleNext={handleNext} />
          ) : currentStep === 6 ? (
            <SubscriptionPlans handleNext={handleNext} />
          ) : currentStep === 7 ? (
            <Elements stripe={stripePromise}>
              <AddStripeAccount handleNext={handleNext} />
            </Elements>
          ) : currentStep === 8 ? (
            <BillingSummary handleNext={handleNext} />
          ) : (
            <SuccessFullyAccountCreated />
          )}

          {/* Progress Bar */}
          {role == "user" && (
            <div className="mt-3 flex items-center justify-center gap-3">
              {steps.map((el, i) => (
                <div
                  key={i}
                  className={`w-[90px] h-1 rounded-full transition-all duration-500 ${el.completed || el.active
                    ? "bg-[linear-gradient(234.85deg,_#27A8E2_-20.45%,_#00034A_124.53%)]"
                    : "bg-[#D9D9D9]"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

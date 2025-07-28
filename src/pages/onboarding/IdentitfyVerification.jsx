import React, { useEffect, useState } from "react";
import AccountCreatedSuccess from "../../components/onboarding/AccountCreatedSuccessfully";
import { PendingIcon, RejectIcon, SuccessIcon } from "../../assets/export";

// Status Icon Component
const StatusIcon = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center">
          <img src={PendingIcon} alt="" />
        </div>
      );
    case "approved":
    case "submitted":
    case "success":
      return (
        <div className="w-20 h-20 rounded-full flex items-center justify-center">
          <img src={SuccessIcon} alt="" />
        </div>
      );
    case "rejected":
      return (
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
          <img src={RejectIcon} alt="" />
        </div>
      );
    default:
      return null;
  }
};

// Reusable Button Component
const Button = ({ text, onClick, variant = "primary" }) => {
  const baseClasses =
    "px-8 py-3 rounded-lg font-medium text-sm transition-colors";
  const variants = {
    primary: "bg-gradient-to-br from-[#27A8E2] to-[#00034A] text-white",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} w-full max-w-xs`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default function IdentityVerification({ handleNext }) {
  const [showModal, setShowModal] = useState(false);
  const [flage, setFlage] = useState(true);
  const [currentStatus, setCurrentStatus] = useState("idcard");

  const statusFlow = ["submitted", "pending", "approved", "success"];

  // Status configurations
  const statusConfig = {
    pending: {
      title: "Request Pending!",
      message:
        "You will receive an email once your request has been approved by the admin.",
      showButton: false,
    },
    submitted: {
      title: "Profile Submitted!",
      message:
        "Your profile has been submitted successfully. You will receive an email once your request has been approved by the admin.",
      showButton: false,
    },
    rejected: {
      title: "Request Rejected!",
      message: "Your profile has been rejected due to the following reasons.",
      reasons: [
        "Your profile picture is blurry.",
        "Government ID is not readable.",
      ],
      showButton: true,
      buttonText: "Resubmit",
      buttonVariant: "danger",
    },
    approved: {
      title: "Congratulations!",
      message: "Your request has been approved.",
      showButton: true,
      onClick: handleNext,
      buttonText: "Get Started",
      buttonVariant: "primary",
    },
    success: {
      title: "Account Created",
      message: "Your profile has been created successfully.",
      showButton: true,
      onClick: handleNext,
      buttonText: "Get Started",
      buttonVariant: "primary",
    },
  };

  const config = statusConfig[currentStatus];

  useEffect(() => {
    if (currentStatus != "idcard" && flage) {
      const timeout1 = setTimeout(() => {
        setCurrentStatus("pending");
      }, 1000);

      const timeout2 = setTimeout(() => {
        setCurrentStatus("approved");
        setFlage(false);
      }, 2000);

      const timeout3 = setTimeout(() => {
        setCurrentStatus("success");
      }, 3000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, [currentStatus]);

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      {currentStatus === "idcard" ? (
        <>
          <h2 className="text-[32px] font-bold text-[#181818] text-center">
            Add Certification
          </h2>
          <p className="text-center text-[#565656] text-[16px] mt-2">
            Please enter your certification details to add certification
          </p>

          {/* Front ID Upload */}
          <div className="h-[200px] mt-10 w-full">
            <label className="block text-sm font-semibold mb-1">
              Government ID{" "}
              <span className="text-[#565656] text-[14px]">(Front)</span>
            </label>
            <div className="flex justify-center items-center h-full w-full border rounded-[8px] border-dashed border-[#00034A]">
              <div className="text-center">
                <label
                  htmlFor="cardfront"
                  className="bg-gradient-to-r cursor-pointer from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
                >
                  Upload “Government ID Card”
                </label>
                <input
                  type="file"
                  name="cardfront"
                  id="cardfront"
                  className="hidden"
                />
                <br />
                <span className="text-[#8F8F8F] font-[400] text-[12px]">
                  Upload files up to 20 MB JPG, PNG
                </span>
              </div>
            </div>
          </div>

          {/* Back ID Upload */}
          <div className="h-[200px] mt-10 w-full">
            <label className="block text-sm font-semibold mb-1">
              Government ID{" "}
              <span className="text-[#565656] text-[14px]">(Back)</span>
            </label>
            <div className="flex justify-center items-center h-full w-full border rounded-[8px] border-dashed border-[#00034A]">
              <div className="text-center">
                <label
                  htmlFor="cardback"
                  className="bg-gradient-to-r cursor-pointer from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
                >
                  Upload “Government ID Card”
                </label>
                <input
                  type="file"
                  name="cardback"
                  id="cardback"
                  className="hidden"
                />
                <br />
                <span className="text-[#8F8F8F] font-[400] text-[12px]">
                  Upload files up to 20 MB JPG, PNG
                </span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => {
              setShowModal(true); // Show modal
            }}
            className="mt-12 w-full rounded-xl py-3 text-white text-[16px] font-semibold"
            style={{
              background:
                "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
            }}
          >
            Next
          </button>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center max-w-md w-full px-4">
            <StatusIcon status={currentStatus} />
            <h3 className="text-3xl font-semibold text-gray-900">
              {config.title}
            </h3>
            <p className="text-gray-600">{config.message}</p>

            {config.reasons && (
              <ol className="text-gray-600 space-y-1 text-left">
                {config.reasons.map((reason, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ol>
            )}

            {config.showButton && (
              <Button
                text={config.buttonText}
                variant={config.buttonVariant}
                onClick={() => config.onClick?.()}
              />
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      <AccountCreatedSuccess
        isOpen={showModal}
        handleNext={() => {
          setShowModal(false);
          setCurrentStatus("submitted"); // Triggers transition flow
        }}
        setIsOpen={setShowModal}
        setCurrentStatus={setCurrentStatus}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import AccountCreatedSuccess from "../../components/onboarding/AccountCreatedSuccessfully";
import { PendingIcon, RejectIcon, SuccessIcon } from "../../assets/export";
import { useDispatch, useSelector } from "react-redux";
import { CreateVerification } from "../../redux/slices/auth.slice";
import { ErrorToast } from "../../components/global/Toaster";
import { getProviderProfile } from "../../redux/slices/auth.slice";

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
  const dispatch = useDispatch();
  const { isLoading, provider_data } = useSelector((state) => state?.provider);
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(provider_data, "testtt");
  // Current status fetched from API
  const currentStatus =
    provider_data?.identity_verification?.status || "idcard";

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
      onClick: () => {}, // Could reset form here
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
    idcard: {
      title: "Identity Verification",
      message: "Please add your Government ID card to verify your account",
      showButton: false,
    },
  };

  const config = statusConfig[currentStatus];

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getProviderProfile());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!frontFile || !backFile) {
      ErrorToast("Please upload both front and back ID images.");
      return;
    }
    await dispatch(
      CreateVerification({
        national_id_front: frontFile,
        national_id_back: backFile,
      })
    ).unwrap();
    dispatch(getProviderProfile()); // refresh status from API
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      {currentStatus == "idcard" ? (
        <>
          <h2 className="text-[32px] font-bold text-[#181818] text-center">
            Identity Verification
          </h2>
          <p className="text-center text-[#565656] text-[16px] mt-2">
            {config?.message}
          </p>

          {/* Front ID Upload */}
          <div className="h-[200px] mt-10 w-full">
            <label className="block text-sm font-semibold mb-1">
              Government ID{" "}
              <span className="text-[#565656] text-[14px]">(Front)</span>
            </label>
            <div className="flex justify-center items-center h-full w-full border rounded-[8px] border-dashed border-[#00034A] overflow-hidden">
              {frontFile ? (
                <>
                  <label htmlFor="cardfront" className="h-full w-full">
                    <img
                      src={URL.createObjectURL(frontFile)}
                      alt="Front ID Preview"
                      className="cursor-pointer w-full h-full"
                    />
                  </label>
                  <input
                    type="file"
                    id="cardfront"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={(e) => setFrontFile(e.target.files[0])}
                  />
                </>
              ) : (
                <div className="text-center">
                  <label
                    htmlFor="cardfront"
                    className="bg-gradient-to-r cursor-pointer from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
                  >
                    Upload “Government ID Card”
                  </label>
                  <input
                    type="file"
                    id="cardfront"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={(e) => setFrontFile(e.target.files[0])}
                  />
                  <br />
                  <span className="text-[#8F8F8F] text-[12px]">
                    Upload files up to 20 MB JPG, PNG
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Back ID Upload */}
          <div className="h-[200px] mt-10 w-full">
            <label className="block text-sm font-semibold mb-1">
              Government ID{" "}
              <span className="text-[#565656] text-[14px]">(Back)</span>
            </label>
            <div className="flex justify-center items-center h-full w-full border rounded-[8px] border-dashed border-[#00034A] overflow-hidden">
              {backFile ? (
                <>
                  <label htmlFor="cardback" className="h-full w-full">
                    <img
                      src={URL.createObjectURL(backFile)}
                      alt="Back ID Preview"
                      className="cursor-pointer w-full h-full"
                    />
                  </label>
                  <input
                    type="file"
                    id="cardback"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={(e) => setBackFile(e.target.files[0])}
                  />
                </>
              ) : (
                <div className="text-center">
                  <label
                    htmlFor="cardback"
                    className="bg-gradient-to-r cursor-pointer from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
                  >
                    Upload “Government ID Card”
                  </label>
                  <input
                    type="file"
                    id="cardback"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={(e) => setBackFile(e.target.files[0])}
                  />
                  <br />
                  <span className="text-[#8F8F8F] text-[12px]">
                    Upload files up to 20 MB JPG, PNG
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-12 w-full rounded-xl py-3 text-white text-[16px] font-semibold"
            style={{
              background:
                "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
            }}
          >
            {isLoading ? "Uploading..." : "Next"}
          </button>
        </>
      ) : (
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center max-w-md w-full px-4">
            <StatusIcon status={currentStatus} />
            <h3 className="text-3xl font-semibold text-gray-900">
              {config?.title}
            </h3>
            <p className="text-gray-600">{config?.message}</p>

            {config?.reasons && (
              <ol className="text-gray-600 space-y-1 text-left">
                {config.reasons.map((reason, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ol>
            )}

            {config?.showButton && (
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
          dispatch(getProviderProfile()); // Refresh after modal close
        }}
        setIsOpen={setShowModal}
      />
    </div>
  );
}

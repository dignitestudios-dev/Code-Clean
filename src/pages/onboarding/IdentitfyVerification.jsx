import React, { useState } from "react";
import AccountCreatedSuccess from "../../components/onboarding/AccountCreatedSuccessfully";
import { PendingIcon, RejectIcon, SuccessIcon } from "../../assets/export";
// Status Icon Component
const StatusIcon = ({ status }) => {

    switch (status) {
        case 'pending':
            return (
                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center">
                    <img src={PendingIcon} alt="" srcset="" />
                </div>
            );
        case 'approved':
            return (
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <img src={SuccessIcon} alt="" srcset="" />
                </div>
            );
        case 'rejected':
            return (
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                    <img src={RejectIcon} alt="" srcset="" />
                </div>
            );
        case 'success':
            return (
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <img src={SuccessIcon} alt="" srcset="" />
                </div>
            );
        default:
            return null;
    }
};

// Button Component
const Button = ({ text, onClick, variant = 'primary' }) => {
    const baseClasses = "px-8 py-3 rounded-lg font-medium text-sm transition-colors";
    const variants = {
        primary: "bg-gradient-to-br from-[#27A8E2] to-[#00034A] text-white",
        danger: "bg-red-500 text-white hover:bg-red-600"
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
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('idcard');

    // Status configurations
    const statusConfig = {
        pending: {
            title: "Request Pending!",
            message: "You will receive an email once your request has been approved by the admin.",
            showButton: false,
            onClick: "",
        },
        submitted: {
            title: "Profile Submitted!",
            message: "Your profile has been submitted successfully. You will receive an email once your request has been approved by the admin.",
            showButton: false,
            onClick: "",
        },
        rejected: {
            title: "Request Rejected!",
            message: "Your profile has been rejected due to the following reasons.",
            reasons: [
                "Your profile picture is blurry.",
                "Government ID is not readable."
            ],
            showButton: true,
            buttonText: "Resubmit",
            buttonVariant: "danger"
            ,
            onClick: "",
        },
        approved: {
            title: "Congratulations!",
            message: "Your request has been approved.",
            showButton: true,
            buttonText: "Get Started",
            buttonVariant: "primary",
            onClick: "",
        },
        success: {
            title: "Account Created",
            message: "Your profile has been created successfully.",
            showButton: true,
            onClick: handleNext,
            buttonText: "Get Started",
            buttonVariant: "primary"
        }
    };
    const config = statusConfig[currentStatus];
    const handleAddService = (newService) => {
        setServices((prev) => [...prev, newService]);
    };

    return (
        <div className="w-full max-w-lg mx-auto py-6">
            {
                currentStatus == "idcard" ? (
                    <>
                        <h2 className="text-[32px] font-bold text-[#181818] text-center">Add Certification </h2>
                        <p className="text-center text-[#565656] text-[16px] mt-2">
                            Please enter your certification details to add certification
                        </p>
                        <div className="h-[200px] mt-10 w-full" >
                            <label className="block text-sm font-semibold mb-1">Government ID <span className="text-[#565656] text-[14px]" >(Front)</span></label>
                            <div className="flex justify-center items-center h-[100%] w-full border rounded-[8px] border-dashed border-[#00034A] " >
                                <div className="text-center" >
                                    <label htmlFor="cardfront" className="bg-gradient-to-r cursor-pointer from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent">Upload “Government ID Card”</label>
                                    <input type="file" name="cardfront" id="cardfront" className="hidden" />
                                    <br />  <span className="text-[#8F8F8F] font-[400] text-[12px] " >Upto 20mbps JPG, PNG</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[200px] mt-10 w-full" >
                            <label className="block text-sm font-semibold mb-1">Government ID <span className="text-[#565656] text-[14px]" > (Back)</span></label>
                            <div className="flex justify-center items-center h-[100%] w-full border rounded-[8px] border-dashed border-[#00034A] " >
                                <div className="text-center" >
                                    <label htmlFor="cardback" className="bg-gradient-to-r cursor-pointer from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent">Upload “Government ID Card”</label>
                                    <input type="file" name="cardback" id="cardback" className="hidden" />
                                    <br />  <span className="text-[#8F8F8F] font-[400] text-[12px] " >Upto 20mbps JPG, PNG</span>
                                </div>
                            </div>
                        </div>
                        {/* Next Button */}
                        <button
                            onClick={() => setShowModal(!showModal)}
                            className="mt-12 w-full rounded-xl py-3 text-white text-[16px] font-semibold"
                            style={{
                                background: "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                            }}
                        >
                            Next
                        </button>

                    </>
                ) : (
                    <div className="w-full h-screen flex ">
                        {/* Main Content */}
                        <div className="flex-1 flex flex-col items-center justify-center p-8">
                            {/* Status Content */}
                            <div className="max-w-md w-full text-center">
                                <div className="flex flex-col items-center gap-6">
                                    <StatusIcon status={currentStatus} />

                                    <h3 className="text-3xl font-semibold text-gray-900">
                                        {config.title}
                                    </h3>

                                    <p className="text-gray-600 text-center max-w-sm">
                                        {config.message}
                                    </p>

                                    {config.reasons && (
                                        <div className="w-full flex justify-center">
                                            <ol className=" text-gray-600 space-y-1">
                                                {config.reasons.map((reason, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="font-medium">{index + 1}.</span>
                                                        <span>{reason}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}

                                    {config.showButton && (
                                        <Button
                                            text={config.buttonText}
                                            variant={config.buttonVariant}
                                            onClick={() => config.onClick() }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }



            <AccountCreatedSuccess isOpen={showModal} handleNext={handleNext} setIsOpen={setShowModal} setCurrentStatus={setCurrentStatus} />
        </div>
    );
}

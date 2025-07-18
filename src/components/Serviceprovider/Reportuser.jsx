import Modal from "react-modal";
import { useState } from "react";
import SuccessModal from "../global/SuccessModal";

const ReportUser = ({ isOpen, setIsOpen }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        if (reason.trim() === "") return alert("Please enter a reason.");
        setIsSuccess(true);
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                contentLabel="Report User"
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                className="flex items-center justify-center z-[1000]"
                overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
            >
                <div className="bg-white rounded-xl shadow-lg w-[440px] p-6">
                    <h2 className="text-[26px] font-bold text-black text-center mb-1">
                        Report User
                    </h2>
                    <p className="text-sm text-center text-gray-700 mb-5">
                        Are you sure you want to report this User.
                    </p>

                    <label className="block text-sm font-medium text-black mb-1">
                        Reason
                    </label>
                    <textarea
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Type your reason here..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full py-3 rounded-xl bg-gray-100 text-black font-semibold hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 rounded-xl bg-[#EE3131] text-white font-semibold hover:bg-red-600 transition"
                        >
                            Report
                        </button>
                    </div>
                </div>
            </Modal>

            <SuccessModal
                isOpen={isSuccess}
                setIsOpen={setIsSuccess}
                title={"Report Submitted!"}
                des={
                    "Thank you for reporting the issue. Our support team will review your request and get back to you within 24-48 hours."
                }
            />
        </>
    );
};

export default ReportUser;

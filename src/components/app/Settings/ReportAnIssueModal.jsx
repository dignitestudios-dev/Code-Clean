import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { useState } from "react";
import SuccessModal from "../../global/SuccessModal";
const ReportAnIssueModal = ({ isOpen, setIsOpen }) => {
    const [isSuccess, setIsSUccess] = useState(false);
    return (
        <>
            <Modal
                isOpen={isOpen}
                contentLabel="Page Not Found"
                shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
                shouldCloseOnEsc={false}
                className="flex items-center justify-center border-none outline-none z-[1000] "
                overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
            >
                <div className="bg-white rounded-[16px] shadow-lg p-5 w-[500px]   flex flex-col justify-center gap-3 ">
                    <div className="flex justify-between items-center mb-4 mt-4 w-full">
                        <h2 className="text-2xl font-bold text-black">Report An Issue</h2>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <HiOutlineXMark size={23} />
                        </button>
                    </div>
                    <div className="flex items-start  flex-col gap-2 mb-4">


                        {/* Title Field */}
                        <div className="mb-5 w-full">
                            <label className="block text-sm font-semibold text-black mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="Enter title here"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description Field */}
                        <div className="mb-6 w-full">
                            <label className="block text-sm font-semibold text-black mb-2">Description</label>
                            <textarea
                                placeholder="Enter description here"
                                rows={4}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button onClick={() => {
                            setIsSUccess(!isSuccess);
                            setIsOpen(false)
                        }} className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#003973] to-[#27A8E2] hover:opacity-90 transition">
                            Submit
                        </button>
                    </div>
                </div>
            </Modal >
            <SuccessModal isOpen={isSuccess} setIsOpen={setIsSUccess} title={"Report Submitted!"} des={"Thank you for reporting the issue. Our support team will review your request and get back to you within 24-48 hours."} />
        </>
    );
};

export default ReportAnIssueModal;

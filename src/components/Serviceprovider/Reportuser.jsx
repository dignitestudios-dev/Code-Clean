import Modal from "react-modal";
import { useState, useEffect } from "react";
import SuccessModal from "../global/SuccessModal";
import { ErrorToast } from "../global/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { reportUser, resetError } from "../../redux/slices/provider.slice";

const ReportUser = ({ isOpen, setIsOpen, userId, isProvider }) => {
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.provider);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async () => {
    if (reason.trim() === "") return ErrorToast("Please enter a reason.");
    const data = {
      id: userId,
      reason: reason,
    };
    await dispatch(reportUser(data));
    setIsOpen(false);
    setReason("");
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
            Report {isProvider ? "Provider" : "User"}
          </h2>
          <p className="text-sm text-center text-gray-700 mb-5">
            Are you sure you want to report this{" "}
            {isProvider ? "Provider" : "User"}?
          </p>

          <label className="block text-sm font-medium text-black mb-1">
            Reason
          </label>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Type your reason here..."
            maxLength={130}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-gray-100 text-black font-semibold hover:bg-gray-200 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                isLoading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-[#EE3131] hover:bg-red-600"
              }`}
            >
              {isLoading ? "Reporting..." : "Report"}
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

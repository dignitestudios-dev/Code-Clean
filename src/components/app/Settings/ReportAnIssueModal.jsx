import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { useState } from "react";
import SuccessModal from "../../global/SuccessModal";
import { useDispatch, useSelector } from "react-redux";
import { ReportAnIssue } from "../../../redux/slices/provider.slice";
import { ErrorToast } from "../../global/Toaster";

const ReportAnIssueModal = ({ isOpen, setIsOpen }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.provider);

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      return ErrorToast("Title is required");
    }
    if (!description.trim()) {
      return ErrorToast("Description is required");
    }

    // Dispatch call
    const payload = { title, description };
    const result = await dispatch(ReportAnIssue(payload));

    if (result?.meta?.requestStatus === "fulfilled") {
      setIsOpen(false);
      setIsSuccess(true);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Report An Issue"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000] "
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
      >
        <div className="bg-white rounded-[16px] shadow-lg p-5 w-[500px] flex flex-col justify-center gap-3 ">
          <div className="flex justify-between items-center mb-4 mt-4 w-full">
            <h2 className="text-2xl font-bold text-black">Report An Issue</h2>
            <button onClick={() => setIsOpen(false)}>
              <HiOutlineXMark size={23} />
            </button>
          </div>

          <div className="flex items-start flex-col gap-2 mb-4 w-full">
            {/* Title Field */}
            <div className="mb-5 w-full">
              <label className="block text-sm font-semibold text-black mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description Field */}
            <div className="mb-6 w-full">
              <label className="block text-sm font-semibold text-black mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter description here"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#003973] to-[#27A8E2] transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
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

export default ReportAnIssueModal;

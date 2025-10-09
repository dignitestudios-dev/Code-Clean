import React from 'react';

const RejectionModal = ({ isOpen, rejectionReason, onClose, onSubmitAgain }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[19px] p-6 max-w-md w-full mx-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <h2 className="text-[20px] font-[600] text-[#181818]">
            Account Rejected
          </h2>
        </div>

        {/* Message */}
        <p className="text-[14px] text-[#3C3C43D9] mb-4 leading-[21px]">
          Your account has been rejected by the admin. Please review the reason below and submit your application again.
        </p>

        {/* Rejection Reason */}
        <div className="bg-red-50 border border-red-200 rounded-[12px] p-4 mb-6">
          <p className="text-[13px] font-[500] text-[#181818] mb-2">
            Rejection Reason:
          </p>
          <p className="text-[13px] text-[#3C3C43D9] leading-[20px]">
            {rejectionReason || 'Please contact support for more details.'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#181818] rounded-full text-[14px] font-[500] text-[#181818] hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button
            onClick={onSubmitAgain}
            className="flex-1 px-4 py-2 bg-[#0084FF] rounded-full text-[14px] font-[500] text-white hover:bg-[#0070E0] transition"
          >
            Submit Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
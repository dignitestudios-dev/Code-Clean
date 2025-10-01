import Modal from "react-modal";
import { BronzBadge, SuccessIcon } from "../../assets/export";
import { HiOutlineXMark } from "react-icons/hi2";
import { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
const SubscribedPlan = ({ isOpen, setIsOpen, selectedPlane }) => {
  const [step, setStep] = useState(1); // 1 = first modal, 2 = second modal
  const navigate = useNavigate("");
  const handleClose = () => {
    if (step === 1) {
      setStep(2); // Show second modal
    } else {
      setStep(1); // Reset step
      setIsOpen(false); // Hide modal
      Cookies.set("role", "provider");
      navigate("/auth/login");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Subscribed Plan Modal"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
    >
      {step === 1 ? (
        <div className="bg-white w-[500px] p-4 pb-10 rounded-[16px] shadow-lg items-center flex flex-col justify-center gap-3 text-center">
          <div className="w-full flex justify-end">
            <button onClick={handleClose}>
              <HiOutlineXMark />
            </button>
          </div>
          <div className="w-auto flex flex-col mt-4 justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <img src={SuccessIcon} className="w-20 h-20" alt="mail-img" />
              <h3 className="capitalize text-[36px] text-[#181818] font-[600]">
                {selectedPlane?.name}
              </h3>
              <p className="text-[16px] font-[400] text-[#565656]">
                You have successfully subscribed {selectedPlane?.name}.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white w-[500px] p-4 pb-10 rounded-[16px] shadow-lg items-center flex flex-col justify-center gap-3 text-center">
          <div className="w-full flex justify-end">
            <button onClick={handleClose}>
              <HiOutlineXMark />
            </button>
          </div>
          <div className="w-auto flex flex-col mt-4 justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <img src={BronzBadge} className="w-20 h-20" alt="badge-img" />
              <h3 className="capitalize text-[36px] text-[#181818] font-[600]">
                Congratulations!
              </h3>
              <p className="text-[16px] font-[400] text-[#565656]">
                You’ve just unlocked the Bronze Subscription badge! Welcome to
                the Code Clean — time to shine.
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SubscribedPlan;

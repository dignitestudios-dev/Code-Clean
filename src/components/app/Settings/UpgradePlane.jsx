import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { Button } from "../../global/GlobalButton";
import { useState } from "react";
import SubscribedPlan from "../../onboarding/SubscribedPlain";
const UpdgradePlane = ({ isOpen, setIsOpen }) => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
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
        <div className="bg-white rounded-[16px] shadow-lg p-2 w-[450px]   flex flex-col justify-center gap-3 ">
          <div className="flex justify-end w-full">
            <button onClick={() => setIsOpen(!isOpen)}>
              <HiOutlineXMark size={23} />
            </button>
          </div>
          <div className="flex items-start px-5 flex-col gap-2 mb-4">
            <h2 className="text-[#181818] capitalize font-bold text-[20px]">
              upgrade plan
            </h2>
            <p className="text-[#18181880] font-[400] text-[16px]">
              Are you sure you want to upgrade subscription plan?
            </p>
            <div className="flex gap-3 items-center mt-3">
              <div className="w-[100px]" >
                <Button
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setSubscriptionSuccess(true);
                  }}
                  text={"Yes"}
                />
              </div>
              <button className="bg-[#21293514] w-[106px]  text-[#212935] rounded-[8px] p-3">
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <SubscribedPlan
        setIsOpen={setSubscriptionSuccess}
        isOpen={subscriptionSuccess}
      />
    </>
  );
};

export default UpdgradePlane;

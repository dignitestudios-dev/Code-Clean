import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { Button } from "../../global/GlobalButton";
import { useEffect, useState } from "react";
import SubscribedPlan from "../../onboarding/SubscribedPlain";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentMethod,
  getPlans,
  SubscriptionUpgrade,
} from "../../../redux/slices/provider.slice";
import { RiEdit2Fill, RiLoader5Line } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import { stripe } from "../../../assets/export";

const UpdgradePlane = ({ isOpen, setIsOpen, selectedPlane }) => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [step, setStep] = useState("confirm"); // confirm | payment
  const [isPaymentMethod, setPaymentMethod] = useState(null);
  const { bookingRequestLoader, paymentMethod } = useSelector(
    (state) => state?.provider
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaymentMethod());
  }, []);
  const HandleUpgrade = async () => {
    if (!isPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const data = {
      plan_id: selectedPlane?.id,
      payment_method: isPaymentMethod,
    };

    await dispatch(SubscriptionUpgrade(data)).unwrap();
    setIsOpen(false);
    setStep("confirm");
    setPaymentMethod(null);
    dispatch(getPlans());
    setSubscriptionSuccess(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Upgrade Plan"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[16px] shadow-lg p-4 w-[450px] flex flex-col gap-4">
          <div className="flex justify-end w-full">
            <button onClick={() => setIsOpen(false)}>
              <HiOutlineXMark size={23} />
            </button>
          </div>

          {step === "confirm" && (
            <div className="flex flex-col gap-3 px-5 mb-4">
              <h2 className="text-[#181818] font-bold text-[20px] capitalize">
                Upgrade Plan
              </h2>
              <p className="text-[#18181880] text-[16px]">
                Are you sure you want to upgrade subscription plan?
              </p>
              <div className="flex gap-3 mt-3">
                <div className="w-[100px]">
                  <Button text="Yes" onClick={() => setStep("payment")} />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-[#21293514] w-[106px] text-[#212935] rounded-[8px] p-3"
                >
                  No
                </button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="flex flex-col gap-3 px-5 mb-4">
              <h2 className="text-[#181818] font-bold text-[20px] capitalize">
                Select Payment Method
              </h2>

              <div className="flex flex-col gap-2">
                {paymentMethod?.payment_methods &&
                paymentMethod.payment_methods.length > 0 ? (
                  paymentMethod.payment_methods.map((item) => (
                    <div
                      key={item?.id}
                      onClick={() => setPaymentMethod(item?.id)} // Select card
                      className={`cursor-pointer p-4 rounded-lg border transition-all duration-200
        ${
          isPaymentMethod === item?.id
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-gray-200 bg-white hover:border-blue-300"
        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-900 font-mono text-base">
                              **** **** **** {item?.last_digits}
                            </span>
                            <img
                              src={stripe}
                              className="w-[40px]"
                              alt="Stripe logo"
                            />
                          </div>
                        </div>
                        {isPaymentMethod === item?.id && (
                          <span className="text-blue-600 font-semibold text-sm">
                            Selected
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#FFFFFF] p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-mono text-base">
                        No cards found
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-3">
                <div className="w-[100px]">
                  <Button
                    text="Confirm"
                    loading={bookingRequestLoader}
                    onClick={HandleUpgrade}
                  />
                </div>
                <button
                  onClick={() => setStep("confirm")}
                  className="bg-[#21293514] w-[106px] text-[#212935] rounded-[8px] p-3"
                >
                  Back
                </button>
              </div>
            </div>
          )}
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

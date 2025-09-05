import React, { useEffect } from "react";
import Navbar from "../../layout/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { RiEdit2Fill, RiLoader5Line } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import { HeroBg, stripe } from "../../../assets/export";
import { useNavigate } from "react-router";
import { Button } from "../../global/GlobalButton";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePaymentMethod,
  getPaymentMethod,
} from "../../../redux/slices/provider.slice";

export default function PaymentMethod() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { isLoading, paymentMethod, bookingRequestLoader } = useSelector(
    (state) => state.provider
  );
  useEffect(() => {
    dispatch(getPaymentMethod());
  }, []);

  const handleDelete = (id) => {
    dispatch(DeletePaymentMethod(id));
    dispatch(getPaymentMethod());
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="h-full px-10 lg:px-40   -mt-60 bottom-0 items-center gap-3 ">
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate("/app/settings")}>
            <FaArrowLeft color="white" size={16} />
          </button>
          <h1 className="text-[32px] font-semibold text-white">
            Payment Method
          </h1>
        </div>
        <div className="bg-[#F9FAFA] shadow-lg flex h-[300px] flex-col gap-3 mb-48 rounded-[8px] p-10 mt-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-normal text-gray-900 mb-4">
              Credit/debit card
            </h1>
            <div>
              <Button
                text={"Add Card"}
                onClick={() => navigate("/app/create-card")}
              />
            </div>
          </div>
          <p className="text-[16px] text-[#212935] mb-1">Attached Stripe</p>
          {paymentMethod?.payment_methods &&
          paymentMethod.payment_methods.length > 0 ? (
            paymentMethod.payment_methods.map((item) => (
              <div key={item?.id} className="bg-[#FFFFFF] p-4 rounded-lg">
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

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate("/app/edit-card",{state:{id:item?.id}})}
                      style={{
                        background:
                          "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                      }}
                      className="p-2 rounded-[8px] text-white transition-colors"
                    >
                      <RiEdit2Fill size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item?.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      <div className="flex items-center">
                        <LuTrash2 size={16} className="mr-1" />
                        {bookingRequestLoader === item?.id && (
                          <RiLoader5Line className="animate-spin text-lg" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#FFFFFF] p-4 rounded-lg">
              <div className="flex items-center">
                <span className="text-gray-900 font-mono text-base">
                  No cards found
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

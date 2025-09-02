import React, { useState } from "react";
import Navbar from "../../layout/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import Input from "../../global/Input";
import { useFormik } from "formik";
import { stripeAccountValues } from "../../../init/authentication/AuthValues";
import { stripeAccountSchema } from "../../../schema/authentication/AuthSchema";
import { Button } from "../../global/GlobalButton";
import { HeroBg } from "../../../assets/export";
import { useNavigate } from "react-router";
import { ErrorToast } from "../../global/Toaster";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { AddCard } from "../../../redux/slices/provider.slice";
const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1A202C",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: "16px",
      "::placeholder": {
        color: "#CBD5E0",
      },
    },
    invalid: {
      color: "#E53E3E",
      iconColor: "#E53E3E",
    },
  },
};
export default function CreateCard() {
  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState(false);
  const { isLoading } = useSelector((state) => state?.provider);
  const navigate=useNavigate("");
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardNumberElement = elements.getElement(CardNumberElement);
    const { token } = await stripe.createToken(cardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        name: cardHolderName,
      },
    });

    if (error) {
      setStripeError(error?.message);
      ErrorToast(error?.message);
    } else {
      try {
        setLoading(true);
        const data = {
          card_token: token?.id,
          last_digits: paymentMethod?.card?.last4,
          expiry_month: paymentMethod?.card?.exp_month,
          expiry_year: paymentMethod?.card?.exp_year,
          brand: paymentMethod?.card?.brand,
        };
        await dispatch(AddCard(data)).unwrap();
        navigate("/app/payment-method")
      } catch (apiError) {
        ErrorToast(apiError?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="h-full px-10 lg:px-40  w-full -mt-80 bottom-0 items-center gap-3 ">
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={16} />
          </button>
          <h1 className="text-[32px] font-semibold text-white">
            Payment Method
          </h1>
        </div>
        <div className="bg-[#F9FAFA] shadow-lg flex  flex-col gap-3 mb-48 rounded-[8px] p-8 mt-3">
          <h3 className="text-2xl font-semibold text-[#181818]">
            Add Stripe credit/debit card
          </h3>
          <form className="mt-2">
            <div className="bg-white rounded-lg p-5 space-y-4 w-full ">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  placeholder="John Doe"
                  className="border outline-none border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <div className="border border-gray-300 rounded-md px-4 py-2 bg-white">
                  <CardNumberElement options={ELEMENT_OPTIONS} />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Expiry
                  </label>
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-white">
                    <CardExpiryElement options={ELEMENT_OPTIONS} />
                  </div>
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-white">
                    <CardCvcElement options={ELEMENT_OPTIONS} />
                  </div>
                </div>
              </div>
              <div className="w-full mt-3">
                <Button
                  loading={loading  }
                  text={"Add"}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

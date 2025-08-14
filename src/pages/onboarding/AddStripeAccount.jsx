import { useState } from "react";
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "../../axios";
import { Button } from "../../components/global/GlobalButton";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { AddCard } from "../../redux/slices/provider.slice";

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

const AddStripeCard = ({ handleNext }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState(false);
  const { isLoading } = useSelector((state) => state?.provider);
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
        handleNext();
      } catch (apiError) {
        ErrorToast(apiError?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-auto h-[90%] flex flex-col justify-center max-w-2xl mx-auto p-6">
      <h3 className="font-[600] text-center text-[32px] text-[#181818]">
        Add Stripe Account
      </h3>
      <p className="text-[#565656] mt-2 text-center font-[400] text-[16px]">
        Enter your payment details to securely process the payment.
      </p>
      <form className="mt-10">
        <div className="bg-white rounded-lg p-3 space-y-4 w-full xl:max-w-[880px] md:max-w-[550px]">
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
              <label className="block text-sm font-medium mb-1">Expiry</label>
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
            <Button loading={isLoading} text={"Add"} onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStripeCard;

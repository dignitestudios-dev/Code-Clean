import React from "react";
import CreateCard from "../../../components/app/Settings/CreateCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function SettingAddCard() {
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CreateCard />
      </Elements>
    </div>
  );
}

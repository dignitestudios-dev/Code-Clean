import React from "react";
import CreateCard from "../../../components/app/Settings/CreateCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function SettingAddCard() {
  // const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
  const stripePromise = loadStripe('pk_test_51R35dTRu13l5i5sUEtVltwn9P4R1bByNOlamVhR0Vq8xVSG4kMMuFjNAXfQ0swFl3qxbuKtdRLcouiGA0I6rw7i900oTZUOMeu');

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CreateCard />
      </Elements>
    </div>
  );
}

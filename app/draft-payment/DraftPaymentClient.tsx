"use client";
import axios from "axios";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

type Props = { searchParams: any; user: any };

export default function DraftPaymentClient({ searchParams, user }: Props) {
  const checkoutHandler = async () => {
    const session = await axios.post("/api/draft-stripe");
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
    );
    const stripe = await stripePromise;
    const result = await stripe?.redirectToCheckout({
      sessionId: session.data.sessionId,
    });
    if (result?.error) {
        toast.error(result.error.message || "");
    }
  };
  return (
    <div>
      <button onClick={checkoutHandler}>Checkout</button>
    </div>
  );
}

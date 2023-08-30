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
  const refundHandler = async () => {
    const postRefund = await axios.post("/api/create-stripe-refund", {
      paymentId: "pi_3Nd80KAar8ZHD2YJ1Dt1TDfQ", // Get paymentId from Database :>>>> just sample
    });
    console.log({ postRefund: postRefund.data });
  };
  return (
    <div>
      <button onClick={refundHandler}>Refund</button>
      <button onClick={checkoutHandler}>Checkout</button>
    </div>
  );
}

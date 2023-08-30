import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.json();
  const { paymentId } = body;
  console.log({ paymentId });
  const currentUser = await getCurrentUser();
  // console.log("----------env: ", process.env.STRIPE_SECRET_KEY);

  // const redirectURL =;
  process.env.STRIPE_REDIRECT_URL || "http://localhost:3000/payment";
  if (!currentUser) {
    return NextResponse.error();
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
  });
  const session = await stripe.refunds.create({
    payment_intent: paymentId,
  });
  console.log({ session });
  return NextResponse.json({ sessionId: session.id });
}

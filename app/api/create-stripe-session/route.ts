import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    email,
    name,
    phone,
    startDate,
    endDate,
    totalPrice,
    id: accommodationId,
    imageUrl,
    title,
  } = body;
  const currentUser = await getCurrentUser();
  // console.log("----------env: ", process.env.STRIPE_SECRET_KEY);

  const redirectURL =
    process.env.STRIPE_REDIRECT_URL || "http://localhost:3000/payment";
  if (!currentUser) {
    return NextResponse.error();
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
  });

  const strStartDate = new Date(startDate).toISOString().split("T")[0];
  const strEndDate = new Date(endDate).toISOString().split("T")[0];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            images: [imageUrl],
            name: title, // Replace with your product name
            description: `You are booking ${title} from ${strStartDate} to ${strEndDate}`,
          },
          unit_amount: totalPrice * 100, // Replace with your product price in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: redirectURL + `?status=success`,
    cancel_url: redirectURL + "?status=cancel",

    metadata: {
      // images: item.image,
    },
  });

  return NextResponse.json({ sessionId: session.id });
}

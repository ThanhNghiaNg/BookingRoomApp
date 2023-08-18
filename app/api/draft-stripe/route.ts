import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Stripe from "stripe";

export async function POST(request: Request) {
  // const body = await request.json();
  // const {} = body;
  const currentUser = await getCurrentUser();
  console.log("----------env: ", process.env.STRIPE_SECRET_KEY);
  const item = {
    image:
      "https://cdn.tgdd.vn/Files/2013/12/16/534365/ImageAttach/the-nho-sd-3.jpg",
    name: "SD",
    price: 700,
    description: "vlxx",
    quantity: 2,
  };
  const redirectURL = "http://localhost:3000";
  if (!currentUser) {
    return NextResponse.error();
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
  });

  const transformedItem = {
    price_data: {
      currency: "usd",
      product_data: {
        images: [item.image],
        name: item.name,
        description: item.description,
      },
      unit_amount: item.price * 100,
    },
    price: "700000",

    quantity: item.quantity,
  };

  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ["card"],
  //   line_items: [transformedItem],
  //   mode: "payment",
  //   success_url: redirectURL + "?status=success",
  //   cancel_url: redirectURL + "?status=cancel",
  //   metadata: {
  //     images: item.image,
  //   },
  // });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            images: [item.image],
            name: "Sample Product", // Replace with your product name
            description: item.description,
          },
          unit_amount: 2000, // Replace with your product price in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: item.image,
    },
  });

  console.log({ "session----": session });

  return NextResponse.json({ sessionId: session.id });
}

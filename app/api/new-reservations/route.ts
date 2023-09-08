"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { sendMail } from "../../libs/mailService";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    totalPrice,
    startDate,
    endDate,
    accommodationId,
    stripeSessionId,
    email,
    name,
    phone,
    status,
  } = body;

  if (
    !accommodationId ||
    !startDate ||
    !endDate ||
    !totalPrice ||
    !email ||
    !name ||
    !phone ||
    !stripeSessionId ||
    !status
  ) {
    console.log("Empty Field!");
    return NextResponse.error();
  }

  // const accommodationAndReservation = await prisma.accommodation.update({
  //   where: {
  //     id: accommodationId,
  //   },
  //   data: {
  //     reservations: {
  //       create: {
  //         userId: currentUser.id,
  //         startDate,
  //         endDate,
  //         totalPrice
  //       },
  //     },
  //   },
  // });

  const reservation = await prisma.reservation.create({
    data: {
      userId: currentUser.id,
      startDate,
      endDate,
      totalPrice: Number(totalPrice),
      email,
      name,
      phone,
      status,
      accommodationId,
      stripeSessionId,
      paymentId: "",
    },
  });

  // await sendMail("TEST", email, name);

  return NextResponse.json(reservation);
}

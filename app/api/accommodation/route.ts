'use server'

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    properties,
    address,
    accommodationType,
    area,
    beds,
    rooms,
    guest,
    bathrooms,
    featured,
    convenient,
    image,
    detailImage,
    title,
    detailDescription,
    pricesPerDate,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const accommodation = await prisma.accommodation.create({
    data: {
      properties,
      address,
      accommodationType,
      area,
      beds,
      rooms,
      guest,
      bathrooms,
      featured,
      convenient,
      image,
      detailPictures: detailImage,
      title,
      detailDescription,
      pricesPerDate: parseInt(pricesPerDate, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(accommodation);
}

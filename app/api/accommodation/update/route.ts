"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      console.log("first1");
      return NextResponse.error();
    }
    console.log("first2");

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
      accommodationId,
    } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });
    console.log({
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
      accommodationId,
    });
    const accommodation = await prisma.accommodation.update({
      where: {
        id: accommodationId,
      },
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
  } catch (err) {
    console.log(err);
  }
}

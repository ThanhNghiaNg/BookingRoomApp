"use server";

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { address, title } = body;
  console.log({
    address,
    title,
  });
  const accommodations = await prisma.accommodation.updateMany({
    where: {
      title: title,
    },
    data: {
      address,
    },
  });

  // Object.keys(body).forEach((value: any) => {
  //   if (!body[value]) {
  //     NextResponse.error();
  //   }
  // });

  // const accommodation = await prisma.accommodation.create({
  //   data: {
  //     properties,
  //     address,
  //     accommodationType,
  //     area,
  //     beds,
  //     rooms,
  //     guest,
  //     bathrooms,
  //     featured,
  //     convenient,
  //     image,
  //     detailPictures: detailImage,
  //     title,
  //     detailDescription,
  //     pricesPerDate: parseInt(pricesPerDate, 10),
  //     userId: currentUser.id,
  //   },
  // });

  return NextResponse.json({ message: "success", accommodations });
}

"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { ResType, ReviewType } from "@/app/actions/getReviewByAccId";
interface IParams {
  accommodationId?: string;
}

export interface CreateReviewResType {
  reviewByAccId: ResType;
  reviewByUserId: ReviewType | null;
}

export async function POST(request: Request) {
  console.log("start");
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  const body = await request.json();
  const {
    accommodationId,
    userId,
    hygienic,
    location,
    price,
    quality,
    rooms,
    establishments,
    rating,
  } = body;

  if (!accommodationId || !userId) {
    return NextResponse.error();
  }

  const review = await prisma.review.create({
    data: {
      accommodationId,
      userId,
      hygienic,
      location,
      price,
      quality,
      rooms,
      establishments,
      rating,
    },
  });

  return NextResponse.json(review);
}

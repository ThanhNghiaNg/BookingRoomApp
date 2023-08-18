"use server";

import prisma from "@/app/libs/prismadb";
import { ReviewType } from "./getReviewByAccId";

interface IParams {
  userId?: string | undefined;
  accommodationId?: string;
}

export default async function getReviewByUserId(params: IParams) {
  try {
    const { userId, accommodationId } = params;

    const review: ReviewType | null = await prisma.review.findFirst({
      where: {
        userId: userId,
        accommodationId: accommodationId,
      },
      select: {
        id: true,
        hygienic: true,
        location: true,
        price: true,
        quality: true,
        rooms: true,
        establishments: true,
        rating: true,
      },
    });

    const res: ReviewType | null = review && {
      id: review.id,
      hygienic: review.hygienic,
      location: review.location,
      price: review.price,
      quality: review.quality,
      rooms: review.rooms,
      establishments: review.establishments,
      rating: review.rating,
    };

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

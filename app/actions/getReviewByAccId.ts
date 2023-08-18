"use server";

import prisma from "@/app/libs/prismadb";

interface IParams {
  accommodationId?: string;
}

export interface ReviewType {
  id?: string;
  hygienic: number;
  location: number;
  price: number;
  quality: number;
  rooms: number;
  establishments: number;
  rating: number;
}

export interface ResType extends ReviewType {
  count: number;
}

const roundHalf = (num: number) => {
  return (Math.round(num * 2) / 2) as number;
};

const cal = (arr: number[]) => {
  return roundHalf(
    arr.reduce((sum, value) => {
      return sum + value;
    }, 0) / arr.length
  );
};

export default async function getReviewByAccId(params: IParams) {
  try {
    const { accommodationId } = params;

    const review: ReviewType[] = await prisma.review.findMany({
      where: {
        accommodationId: accommodationId,
      },
      select: {
        hygienic: true,
        location: true,
        price: true,
        quality: true,
        rooms: true,
        establishments: true,
        rating: true,
      },
    });
    const hygienic: number = cal(
      review.map((item) => {
        return item.hygienic ? item.hygienic : 0;
      })
    );

    const location: number = cal(
      review.map((item) => {
        return item.location ? item.location : 0;
      })
    );

    const price: number = cal(
      review.map((item) => {
        return item.price ? item.price : 0;
      })
    );

    const quality: number = cal(
      review.map((item) => {
        return item.quality ? item.quality : 0;
      })
    );

    const rooms: number = cal(
      review.map((item) => {
        return item.rooms ? item.rooms : 0;
      })
    );

    const establishments: number = cal(
      review.map((item) => {
        return item.establishments ? item.establishments : 0;
      })
    );

    const rating: number = cal(
      review.map((item) => {
        return item.rating ? item.rating : 0;
      })
    );

    // if (!review) {
    //   return null;
    // }
    const res: ResType = {
      hygienic: hygienic ? hygienic : 0,
      location: location ? location : 0,
      price: price ? price : 0,
      quality: quality ? quality : 0,
      rooms: rooms ? rooms : 0,
      establishments: establishments ? establishments : 0,
      rating: rating ? rating : 0,
      count: review.length,
    };

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  const popularHotels = await prisma.reservation.groupBy({
    by: ["accommodationId"],
    _count: {
      accommodationId: true,
    },
    orderBy: {
      _count: {
        accommodationId: "desc",
      },
    },
    where: {
      status: "success",
    },
  });

  const accommodationIds = popularHotels.map((hotel) => hotel.accommodationId);

  const accommodations = await prisma.accommodation.findMany({
    where: {
      id: {
        in: accommodationIds,
      },
    },
  });

  if (accommodations.length < 5) {
    const additionalCount = 10 - accommodations.length;

    const randomHotels = await prisma.accommodation.findMany({
      where: {
        id: {
          notIn: accommodationIds,
        },
      },
      take: additionalCount,
      skip: 0,
    });

    accommodations.push(...randomHotels);
  }

  return NextResponse.json(accommodations);
}

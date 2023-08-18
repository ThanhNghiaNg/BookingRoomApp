"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  const trendingLocations = await prisma.reservation.groupBy({
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
      status: "success", // Adjust this filter based on your needs
    },
  });

  const accommodationIds = trendingLocations.map(
    (location) => location.accommodationId
  );

  const trendingLocationsWithInfo = await prisma.accommodation.findMany({
    where: {
      id: {
        in: accommodationIds,
      },
    },
    select: {
      id: true,
      address: true,
      area: true,
    },
  });

  const formattedTrendingLocations = trendingLocationsWithInfo.map((info) => {
    const count =
      trendingLocations.find((location) => location.accommodationId === info.id)
        ?._count?.accommodationId || 0;
    return {
      accommodationId: info.id,
      address: info.address,
      area: info.area,
      count,
    };
  });

  return NextResponse.json(formattedTrendingLocations);
}

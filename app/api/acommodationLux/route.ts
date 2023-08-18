"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  const expensiveRooms = await prisma.accommodation.findMany({
    take: 10,
    where: {
      pricesPerDate: {
        gte: 150,
      },
    },
  });

  return NextResponse.json(expensiveRooms);
}

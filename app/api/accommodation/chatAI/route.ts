"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const { locations } = await request.json();

  const accommodationsAI = await prisma.accommodation.findMany({
    where: {
      OR: [{ address: { in: locations } }, { area: { in: locations } }],
    },
    select: {
      id: true,
    },
  });

  const accommodationIds = accommodationsAI.map(
    (accommodation) => accommodation.id
  );

  return NextResponse.json(accommodationIds);
}

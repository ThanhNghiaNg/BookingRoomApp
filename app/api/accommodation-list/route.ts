import { create } from "zustand";
("use server");

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();

  const { userId, accommodationId } = body;
  const query: any = {};

  if (accommodationId) {
    query.accommodationId = accommodationId;
  }

  if (userId) {
    query.userId = userId;
  }

  const accommodation = await prisma.accommodation.findMany({
    where: query,
    include: {
      reservations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const safeAccommodation = accommodation.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return NextResponse.json({
    data: safeAccommodation,
  });
}

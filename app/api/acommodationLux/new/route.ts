"use server";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  const newestAccommodations = await prisma.accommodation.findMany({
    take: 10,
    orderBy: {
      createdAt: "asc", // Sắp xếp theo trường createdAt giảm dần
    },
  });

  return NextResponse.json(newestAccommodations);
}

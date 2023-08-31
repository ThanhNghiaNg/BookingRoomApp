import { create } from "zustand";
("use server");

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const reservations = await prisma.personalRecommend.findFirst({
    where: {
      userId: currentUser.id,
    },
  });

  return NextResponse.json({
    recommendList: reservations || [],
  });
}

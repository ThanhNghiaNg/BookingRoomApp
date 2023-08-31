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

  const body = await request.json();

  const { recommendList } = body;

  if (!recommendList?.length) {
    const reservations = await prisma.personalRecommend.findFirst({
      where: {
        userId: currentUser?.id,
      },
    });

    return NextResponse.json({
      recommendList: reservations?.recommendList,
    });
  }

  const newDataList = recommendList?.map((item: any) => {
    return item?._id || "";
  });

  const updatedPersonal = await prisma.personalRecommend.create({
    data: {
      userId: currentUser.id,
      recommendList: newDataList,
    },
  });

  return NextResponse.json({
    dataUpdate: updatedPersonal,
  });
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { recommendList } = body;

  const newDataList = recommendList?.map((item: any) => {
    return item?._id || "";
  });

  const updatedPersonal = await prisma.personalRecommend.update({
    where: { userId: currentUser.id },
    data: {
      userId: currentUser.id,
      recommendList: newDataList,
    },
  });

  return NextResponse.json({
    updatedPersonal,
  });
}

interface IParams {
  userId?: string;
}

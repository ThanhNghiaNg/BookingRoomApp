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

  const { notificationData } = body;
  console.log("request body", body);
  console.log("request notificationData", notificationData);

  if (
    notificationData?.userId === currentUser.id &&
    !!notificationData?.content
  ) {
    const notification = await prisma.notification.create({
      data: {
        content: notificationData?.content,
        userId: currentUser.id,
        type: notificationData?.type,
        ...(notificationData?.parnerID
          ? { parnerUserId: notificationData?.parnerID }
          : {}),
        ...(notificationData?.parnerAvatar
          ? { parnerAvatar: notificationData?.parnerAvatar }
          : {}),
      },
    });

    return NextResponse.json({
      status: true,
    });
  }

  return NextResponse.json({
    status: false,
  });
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const notification = await prisma.notification.findMany({
      where: {
        userId: currentUser?.id || "",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      notification,
    });
  } catch (err) {
    return NextResponse.json({
      notification: [],
    });
  }
}

import { create } from "zustand";
("use server");

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeReservation } from "@/app/types";

interface IParams {
  accommodationId?: string;
  userId?: string;
}
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { accommodationId, userId } = body;
  const query: any = {};

  if (accommodationId) {
    query.accommodationId = accommodationId;
  }

  // if (currentUser.id) {
  //   query.userId = currentUser.id;
  // }

  const reservations = await prisma.reservation.findMany({
    where: query,
    include: {
      accommodation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const res: SafeReservation[] = [];

  reservations?.map?.((reservation) => {
    const temp = {
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      accommodation: {
        ...reservation.accommodation,
        createdAt: reservation.accommodation.createdAt.toISOString(),
      },
      roomOwnId: reservation.accommodation.userId,
    };
    res.push(temp);
  }) || [];

  return NextResponse.json({
    safeReservations: res,
  });
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return NextResponse.json({
    currentUser,
  });
}

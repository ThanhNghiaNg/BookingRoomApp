"use server";

import prisma from "@/app/libs/prismadb";
import { SafeReservation } from "../types";

interface IParams {
  accommodationId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { accommodationId, userId, authorId } = params;

    const query: any = {};

    if (accommodationId) {
      query.accommodationId = accommodationId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.accommodation = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        accommodation: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      accommodation: {
        ...reservation.accommodation,
        createdAt: reservation.accommodation.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    // throw new Error(error);
    console.log(error);
  }
}

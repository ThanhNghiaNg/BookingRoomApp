"use server";

import prisma from "@/app/libs/prismadb";

interface IParams {
  accommodationId: string;
}

export default async function getAccomodationById(params: IParams) {
  try {
    const { accommodationId } = params;

    const accommodation = await prisma.accommodation.findFirst({
      where: {
        id: accommodationId,
      },
    });

    if (!accommodation) {
      return null;
    }

    return {
      ...accommodation,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

"use server";

import prisma from "@/app/libs/prismadb";

interface IParams {
  accommodationId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { accommodationId } = params;

    const accommodation = await prisma.accommodation.findFirst({
      where: {
        id: accommodationId,
      },
      include: {
        user: true,
      },
    });

    if (!accommodation) {
      return null;
    }

    return {
      ...accommodation,
      createdAt: accommodation.createdAt.toString(),
      user: {
        ...accommodation.user,
        createdAt: accommodation.user.createdAt.toString(),
        updatedAt: accommodation.user.updatedAt.toString(),
        emailVerified: accommodation.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

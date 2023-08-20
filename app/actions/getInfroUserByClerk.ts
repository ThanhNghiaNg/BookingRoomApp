"use server";

import prisma from "@/app/libs/prismadb";

interface IParams {
  userID: string;
}

export default async function getInfroUserByClerk(params: IParams) {
  try {
    const { userID } = params;

    const idClerk = await prisma.user.findFirst({
      where: {
        id: userID,
      },
      select: {
        userClerkId: true,
      },
    });

    return {
      ...idClerk,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

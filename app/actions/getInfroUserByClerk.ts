"use server";

import prisma from "@/app/libs/prismadb";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

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

    const userClerk: User = await clerkClient.users.getUser(
      idClerk?.userClerkId as string
    );

    return {
      ...userClerk,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

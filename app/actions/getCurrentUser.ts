"use server";
import prisma from "@/app/libs/prismadb";
import { getUserIdClerk } from "./getUserIdClerk";

export default async function getCurrentUser() {
  try {
    const userid = await getUserIdClerk();

    const currentUser = await prisma.user.findFirst({
      where: {
        userClerkId: userid as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

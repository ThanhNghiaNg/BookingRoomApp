"use server";

import { getServerSession } from "next-auth/next";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUserPersonal(userId?: string) {
  try {
    if (!userId) {
      return undefined;
    }

    const currentPersonal = await prisma.personal.findUnique({
      where: {
        userId,
      },
    });

    if (!currentPersonal) {
      return undefined;
    }

    return currentPersonal;
  } catch (error: any) {
    return undefined;
  }
}

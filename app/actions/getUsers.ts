"use server";
import prisma from "@/app/libs/prismadb";

export async function getUsers() {
  const users = await prisma.user.findMany();

  return users.map((user) => {
    user.createdAt = "";
    user.emailVerified = "";
    user.updatedAt = "";
    return user;
  });
}

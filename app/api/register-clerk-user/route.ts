import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, imageUrl, userClerkId } = body;

  const checkEmailExists = async (email: string) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return existingUser !== null;
  };

  const emailExists = await checkEmailExists(email);

  if (emailExists) {
    return new NextResponse();
  }

  const user = await prisma.user.create({
    data: {
      email,
      image: imageUrl,
      userClerkId,
      emailVerified: new Date(),
      isVerified: true,
    },
  });

  return NextResponse.json(user);
}

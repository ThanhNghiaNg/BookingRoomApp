import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { sendMail } from "../../libs/mailService";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

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
    return new NextResponse("Email đã tồn tại", {
      status: 409,
      statusText: "Conflict",
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      isHaveHobbies: false,
    },
  });

  return NextResponse.json(user);
}

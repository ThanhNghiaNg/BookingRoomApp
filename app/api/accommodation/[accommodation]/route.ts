import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  accommodationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { accommodationId } = params;

  if (!accommodationId || typeof accommodationId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.accommodation.deleteMany({
    where: {
      id: accommodationId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  console.log("params: ", params);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { accommodationId } = params;

  if (!accommodationId || typeof accommodationId !== "string") {
    throw new Error("Invalid ID");
  }

  const accommodation = await prisma.accommodation.findMany({
    where: {
      id: accommodationId,
    },
  });

  return NextResponse.json(accommodation);
}

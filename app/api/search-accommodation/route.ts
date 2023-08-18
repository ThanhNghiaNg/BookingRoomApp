import { NextResponse } from "next/server";

("use server");

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const { location } = await request.json();
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id || "";
    if (!currentUser) {
      return NextResponse.error();
    }

    if (!location || typeof location !== "string") {
      throw new Error("Invalid location");
    }
    const searchHistoryExist = await prisma.searchHistory.findFirst({
      where: {
        location: {
          contains: location,
          mode: "insensitive",
        },
      },
    });
    console.log("searchHistoryExist: ", searchHistoryExist);
    let searchHistory;
    if (searchHistoryExist) {
      searchHistory = await prisma.searchHistory.update({
        where: {
          id: searchHistoryExist.id,
        },
        data: {
          times: Number(searchHistoryExist.times || 0) + 1,
        },
      });
    } else {
      searchHistory = await prisma.searchHistory.create({
        data: {
          location,
          userId,
          times: 1,
        },
      });
    }

    return NextResponse.json(searchHistory);
  } catch (err) {
    console.log(err);
  }
}

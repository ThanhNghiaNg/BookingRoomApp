"use server";
import { convenient_list } from "../../data/convenient";
import prisma from "@/app/libs/prismadb";
import { IAccommodationParams } from "./getAccommodation";
import { SearchProps } from "../search-accomodation/page";

export type IAccommodationFilter = {
  bathroomCount?: string | number;
  guestCount?: string | number;
  roomCount?: string | number;
  endDate?: string;
  startDate?: string;
  locationValue?: string;
};

export default async function getAccommodationsFilter(
  params: IAccommodationFilter
) {
  try {
    const { bathroomCount, guestCount, roomCount, endDate, startDate } = params;
    let query: any = {};
    query = {
      bathrooms: { gte: Number(bathroomCount) },
      rooms: { gte: Number(roomCount) },
      guest: { gte: Number(guestCount) },
    };
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const accommodations = await prisma.accommodation.findMany({
      where: query,
    });

    if (!accommodations) {
      return null;
    }

    const filterInit = {
      properties: new Set(),
      featured: new Set(),
      convenient: new Set(),
    };

    const filters = accommodations.reduce((acc, item) => {
      acc.properties.add(item.properties);
      item.featured.forEach((i) => acc.featured.add(i));
      item.convenient.forEach((i) => acc.convenient.add(i));
      return acc;
    }, filterInit);

    const formatFilter = [
      {
        title: "Properties",
        key: "properties",
        children: Array.from(filters.properties),
      },
      {
        title: "Features",
        key: "featured",
        children: Array.from(filters.featured),
      },
      {
        title: "Convenient",
        key: "convenient",
        children: Array.from(filters.convenient),
      },
    ];

    return formatFilter;
  } catch (error: any) {
    console.log("---Error---: ", error);
    // throw new Error(error);
  }
}

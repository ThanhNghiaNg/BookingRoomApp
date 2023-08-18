import { convenient_list } from "../../data/convenient";
import prisma from "@/app/libs/prismadb";
import { IAccommodationParams } from "./getAccommodation";
import { SearchProps } from "../search-accomodation/page";
import { IAccommodationFilter } from "./getAccomodationFilters";

export default async function getAccommodations(
  params: IAccommodationParams & IAccommodationFilter
) {
  try {
    const searchParams = params;
    const {
      featured,
      convenient,
      properties,
      bathroomCount,
      guestCount,
      roomCount,
      endDate,
      startDate,
      locationValue,
      page,
      pageSize,
    } = {
      ...searchParams,
      ...(searchParams.featured
        ? {
            featured: searchParams.featured || "",
            convenient: searchParams.convenient || "",
            properties: searchParams.properties || "",
          }
        : {}),
    };

    let query: any = {};
    query = {
      bathrooms: { gte: Number(bathroomCount) },
      rooms: { gte: Number(roomCount) },
      guest: { gte: Number(guestCount) },
      ...(featured
        ? {
            featured: {
              hasEvery: typeof featured === "string" ? [featured] : featured,
            },
          }
        : {}),
      ...(convenient
        ? {
            convenient: {
              hasEvery:
                typeof convenient === "string" ? [convenient] : convenient,
            },
          }
        : {}),
      ...(properties
        ? {
            properties:
              typeof properties === "string" ? properties : properties,
          }
        : {}),
    };

    if (locationValue) {
      query.OR = [
        {
          area: {
            contains: locationValue,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: locationValue,
            mode: "insensitive",
          },
        },
      ];
    }
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
      skip: 0, //(Number(page) - 1) * Number(pageSize),
      take: Number(page) * Number(pageSize),
      where: query,
    });

    if (!accommodations) {
      return null;
    }

    const returnAccommodations = accommodations.map((i) => ({
      ...i,
      createdAt: i.createdAt.toISOString(),
    }));

    return returnAccommodations;
    // return {
    //   filters: formatFilter,
    //   accommodations: returnAccommodations,
    // };
  } catch (error: any) {
    console.log("---Error---: ", error);
    // throw new Error(error);
  }
}

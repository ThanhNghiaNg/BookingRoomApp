import prisma from "@/app/libs/prismadb";

export interface IAccommodationParams {
  userId?: string;
  properties?: string;
  accommodationType?: string;
  area?: string;
  address?: string;
  beds?: number;
  rooms?: number;
  guest?: number;
  bathrooms?: number;
  convenient?: string[];
  featured?: string[];
  image?: string;
  detailPictures?: string[];
  title?: string;
  detailDescription?: string;
  pricesPerDate?: number;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
}

export default async function getAccommodation(params: IAccommodationParams) {
  try {
    const {
      accommodationType,
      address,
      area,
      bathrooms,
      beds,
      convenient,
      detailDescription,
      detailPictures,
      featured,
      guest,
      image,
      pricesPerDate,
      properties,
      rooms,
      title,
      userId,
      startDate,
      endDate,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (accommodationType) {
      query.accommodationType = accommodationType;
    }

    if (address) {
      query.address = address;
    }

    if (area) {
      query.area = area;
    }

    if (bathrooms) {
      query.bathrooms = {
        gte: +bathrooms,
      };
    }

    if (beds) {
      query.beds = {
        gte: +beds,
      };
    }

    if (convenient) {
      query.convenient = convenient;
    }

    if (detailDescription) {
      query.detailDescription = detailDescription;
    }

    if (detailPictures) {
      query.detailPictures = detailPictures;
    }

    if (featured) {
      query.featured = featured;
    }

    if (guest) {
      query.guest = {
        gte: +guest,
      };
    }

    if (image) {
      query.image = image;
    }

    if (pricesPerDate) {
      query.pricesPerDate = pricesPerDate;
    }

    if (properties) {
      query.properties = properties;
    }

    if (rooms) {
      query.rooms = {
        gte: +rooms,
      };
    }

    if (title) {
      query.title = title;
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

    const Accommodation = await prisma.accommodation.findMany({
      take: 10,
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeAccommodation = Accommodation.map((accommodation) => ({
      ...accommodation,
      createdAt: accommodation.createdAt.toISOString(),
    }));

    return safeAccommodation;
  } catch (error: any) {
    throw new Error(error);
  }
}

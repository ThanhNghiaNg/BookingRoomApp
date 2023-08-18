import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { accommodation_type } from "@/data/AccommodationType";
import { feature_list } from "@/data/Featured";
import { convenient_list } from "@/data/convenient";
import { categories } from "@/data/categories_updated";
export const feature_list_old = [
  {
    label: "Bể bơi",
  },
  {
    label: "Sân rộng",
  },
  {
    label: "Lò nướng BBQ",
  },
  {
    label: "Khu vực ăn nhiều người",
  },
  {
    label: "Bếp trại",
  },
  {
    label: "Lối ra biển",
  },
  {
    label: "Gần trung tâm",
  },
];

export const convenient_list_old = [
  {
    label: "Wifi",
  },
  {
    label: "TV",
  },
  {
    label: "Bếp",
  },
  {
    label: "Máy giặt",
  },
  {
    label: "Chỗ để Ô tô",
  },
  {
    label: "Điều hoà",
  },
  {
    label: "Không gian làm việc",
  },
];

export const accommodation_type_old = [
  {
    label: "Toàn bộ nhà",
    description: "Khách được sử dụng riêng toàn bộ chỗ này",
    value: 1,
  },
  {
    label: "Theo phòng",
    description: "Khách được sử dụng chỉ một phòng theo lựa chọn",
    value: 0,
  },
  {
    label: "Phòng chung",
    description:
      "Khách được sử dụng một phòng chung, nơi những khách khác - hoặc nhóm bạn có thể sử dụng",
    value: 2,
  },
];

export const categories_old = [
  {
    label: "Nhà nông trại",
    description: "Đây là nhà có nông trại, gần gũi với thiên nhiên",
  },
  {
    label: "Villa",
    description: "Đây là villa cao cấp",
  },
  {
    label: "Căn hộ",
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Đảo",
    description: "This property is on an island!",
  },
  {
    label: "Castles",
    description: "This property is an ancient castle!",
  },
  {
    label: "Camping",
    description: "This property offers camping activities!",
  },
  {
    label: "Barns",
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    description: "This property is brand new and luxurious!",
  },
];
export async function GET(request: Request) {
  try {
    const accommodations = await prisma.accommodation.findMany();
    const updatePropertiesAccommodations = accommodations.map((accom, i) => {
      console.log({ i, properties: accom.properties });
      let idx = categories_old.findIndex((c) => c.label === accom.properties);
      if ( accom.properties === "Arctic" || accom.properties === "Desert") idx = 0
      accom.properties = categories[idx].label;
      return accom
    });

    const results = updatePropertiesAccommodations.map(async (accom) => {
      return await prisma.accommodation.update({
        where: { id: accom.id },
        data: {
          properties: accom.properties,
        },
      });
    });
    // const updatedAcommodations = accommodations.map((accom) => {
    //   const typeIdx = accommodation_type_old.findIndex(
    //     (i) => i.label === accom.accommodationType
    //   );
    //   accom.accommodationType = accommodation_type[typeIdx].label;

    //   const featureIdxs = feature_list_old
    //     .map((i, idx) => (accom.featured.includes(i.label) ? idx : undefined))
    //     .filter((i) => i != undefined);
    //   console.log({ featureIdxs });
    //   accom.featured = feature_list
    //     .filter((i, idx) => featureIdxs.includes(idx))
    //     .map((i) => i.label);

    //   const convenienetIdxs = convenient_list_old
    //     .map((i, idx) => (accom.convenient.includes(i.label) ? idx : undefined))
    //     .filter((i) => i != undefined);
    //   accom.convenient = convenient_list
    //     .filter((i, idx) => convenienetIdxs.includes(idx))
    //     .map((i) => i.label);

    //   return accom;
    // });
    // const results = updatedAcommodations.map(async (accom) => {
    //   return await prisma.accommodation.update({
    //     where: { id: accom.id },
    //     data: {
    //       accommodationType: accom.accommodationType,
    //       featured: accom.featured,
    //       convenient: accom.convenient,
    //     },
    //   });
    // });
    return NextResponse.json({
      message: "Success!",
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}

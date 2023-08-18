import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { accommodation_type } from "@/data/AccommodationType";
import { feature_list } from "@/data/Featured";
import { convenient_list } from "@/data/convenient";
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
export async function GET(request: Request) {
  try {
    const accommodations = await prisma.accommodation.findMany();
    const updatedAcommodations = accommodations.map((accom) => {
      const typeIdx = accommodation_type_old.findIndex(
        (i) => i.label === accom.accommodationType
      );
      console.log(
        typeIdx,
        accommodation_type,
        accommodation_type[typeIdx],
        typeIdx
      );
      accom.accommodationType = accommodation_type[typeIdx].label;

      const featureIdxs = feature_list_old
        .map((i, idx) => (accom.featured.includes(i.label) ? idx : undefined))
        .filter((i) => i != undefined);
      console.log({ featureIdxs });
      accom.featured = feature_list
        .filter((i, idx) => featureIdxs.includes(idx))
        .map((i) => i.label);

      const convenienetIdxs = convenient_list_old
        .map((i, idx) => (accom.convenient.includes(i.label) ? idx : undefined))
        .filter((i) => i != undefined);
      accom.convenient = convenient_list
        .filter((i, idx) => convenienetIdxs.includes(idx))
        .map((i) => i.label);

      return accom;
    });
    const results = updatedAcommodations.map(async (accom) => {
      return await prisma.accommodation.update({
        where: { id: accom.id },
        data: {
          accommodationType: accom.accommodationType,
          featured: accom.featured,
          convenient: accom.convenient,
        },
      });
    });
    return NextResponse.json({ message: "Success!", results });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}

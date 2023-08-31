import { create } from "zustand";
("use server");

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    name,
    age,
    amenities,
    specialFeatures,
    image,
    locationWish,
    addressUser,
    roomCategory,
    rentalType,
    costPerNight,
  } = body;

  const updatedPersonal = await prisma.personal.create({
    data: {
      userId: currentUser.id,
      name,
      age,
      amenities,
      specialFeatures,
      image,
      locationWish,
      addressUser,
      roomCategory,
      rentalType,
      costPerNight,
    },
  });

  const updateIsHaveHobbies = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      isHaveHobbies: true,
      name: name,
    },
  });

  return NextResponse.json({
    dataUpdate: updatedPersonal,
    userUpdate: updateIsHaveHobbies,
  });
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    name,
    age,
    amenities,
    specialFeatures,
    image,
    locationWish,
    addressUser,
    roomCategory,
    rentalType,
    costPerNight,
  } = body;

  const updatedPersonal = await prisma.personal.update({
    where: { userId: currentUser.id },
    data: {
      name,
      age,
      amenities,
      specialFeatures,
      image,
      locationWish,
      addressUser,
      roomCategory,
      rentalType,
      costPerNight,
    },
  });

  return NextResponse.json({
    updatedPersonal,
  });
}

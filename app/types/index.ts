import { Accommodation, Personal, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Accommodation, "createdAt"> & {
  createdAt: string;
};

export type SafeAccommodation = Omit<Accommodation, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "accommodation"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  accommodation: SafeAccommodation;
  roomOwnId?: string;
  status?: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "isHaveHobbies"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  isHaveHobbies: boolean | null;
};

export type SafePersonal = Personal;

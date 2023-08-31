"use client";
import React from "react";
import MenuItem from "../components/navbar/MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import ListingCard from "../components/listings/ListingCard";
import { SafeAccommodation, SafeUser } from "../types";
type Props = {
  accommodations: SafeAccommodation[];
  currentUser: SafeUser | null;
};

export default function FavoritesClient({
  accommodations,
  currentUser,
}: Props) {
  return (
    <>
      <div
        className="
      mt-10
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
    "
      >
        {accommodations.map((accommodation: any) => {
          return (
            <ListingCard
              key={accommodation.id}
              data={accommodation}
              actionId={accommodation.id}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </>
  );
}

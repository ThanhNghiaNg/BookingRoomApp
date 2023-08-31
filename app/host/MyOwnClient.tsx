"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";

import ListingCard from "@/app/components/listings/ListingCard";
import Calendar from "./Calendar";

interface MyOwnClientProps {
  room: any[];
  currentUser: SafeUser | null;
  ReservationListData?: any[];
}

const MyOwnClient: React.FC<MyOwnClientProps> = ({
  room,
  currentUser,
  ReservationListData = [],
}) => {
  const router = useRouter();
  const [selectId, setSelectId] = useState<string>();

  const onClickCard = (room: any) => {
    setSelectId(room.id);
  };

  return (
    <>
      {/* welcome view                   */}
      <p className="mb-5 text-base">
        Guests can book a room at your property 24 hours after when you post the
        rental. Here's how to prepare.
      </p>
      {selectId ? (
        <>
          <button
            className="px-3 py-2 text-base font-bold text-[#fb06a4] rounded-md shadow ring-1 ring-red-200 mb-5"
            onClick={() => setSelectId(undefined)}
          >
            Click here to back
          </button>

          <Calendar
            reservations={ReservationListData}
            selectedRoom={selectId}
          />
        </>
      ) : (
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
          {room.map((reservation: any) => {
            return (
              <ListingCard
                key={reservation.id}
                data={reservation}
                currentUser={currentUser}
                onClickCard={() => {
                  onClickCard(reservation);
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyOwnClient;

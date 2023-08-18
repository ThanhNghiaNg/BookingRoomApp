"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";

import ListingCard from "@/app/components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
  useAction?: boolean;
  title?: string;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
  useAction,
  title
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <>
      {/* <h1 className="text-xl font-bold">{title}</h1> */}
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
        {useAction && reservations.map((reservation: any) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.accommodation}
              reservation={reservation}
              actionId={reservation.id}
              disabled={deletingId === reservation.id}
              onAction={onCancel}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          );
        })}
        {!useAction && reservations.map((reservation: any) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.accommodation}
              reservation={reservation}
              actionId={reservation.id}
              disabled={deletingId === reservation.id}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </>
  );
};

export default ReservationsClient;

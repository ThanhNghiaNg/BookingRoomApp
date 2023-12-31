"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";

import ListingCard from "@/app/components/listings/ListingCard";
import {
  createNewNotification,
  pushNotification,
} from "../components/Notification/pushNotification";
import { useConfirmCancelModal } from "../hooks/useConfrimModal";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
  useAction?: boolean;
  title?: string;
  editMode?: boolean;
  actionPosition?: "bottom" | "price";
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  useAction,
  currentUser,
  title,
  editMode,
  actionPosition = "bottom",
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const confirmCancelModal = useConfirmCancelModal();

  const onCancel = useCallback(
    (id: string, index?: number) => {
      setDeletingId(id);

      const reservation = reservations.find((r) => r.id === id);

      if (reservation?.status === "COD") {
        axios
          .delete(`/api/reservations/${id}`)
          .then(() => {
            toast.success("Reservation cancelled");
            if (index !== undefined) {
              const notificationData = {
                content: `Your reservation with ${reservations[index].id} ID is canceled`,
                userId: reservations[index].accommodation.userId,
                parnerID: currentUser?.id,
                parnerAvatar: currentUser?.image || undefined,
              };

              pushNotification(notificationData);

              createNewNotification({
                data: [
                  `Your reservation with ${reservations[index].id} ID is canceled`,
                  reservations[index].accommodation.userId || "",
                  "Cancel",
                  currentUser?.id || "",
                  currentUser?.image || "",
                ],
              });
            }
            router.refresh();
          })
          .catch(() => {
            toast.error("Something went wrong.");
          })
          .finally(() => {
            setDeletingId("");
          });
      } else {
        const reservationData = {
          reservations: reservation,
        };

        confirmCancelModal.onOpen(reservationData);
      }
    },
    [router, reservations, currentUser]
  );

  return (
    <>
      {/* <h1 className="text-xl font-bold">{title}</h1> */}
      {!!reservations.length ? (
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-5
          gap-8
        "
        >
          {!useAction &&
            reservations.map((reservation: any, index) => {
              return (
                <ListingCard
                  key={reservation.id}
                  data={reservation.accommodation}
                  reservation={reservation}
                  actionId={reservation.id}
                  disabled={deletingId === reservation.id}
                  currentUser={currentUser}
                  editMode={false}
                />
              );
            })}

          {useAction &&
            reservations.map((reservation: any, index) => {
              return (
                <ListingCard
                  key={reservation.id}
                  data={reservation.accommodation}
                  reservation={reservation}
                  actionId={reservation.id}
                  disabled={deletingId === reservation.id}
                  onAction={onCancel}
                  actionLabel="Cancel reservation"
                  currentUser={currentUser}
                  index={index}
                  editMode={editMode}
                  actionPosition={actionPosition}
                />
              );
            })}
        </div>
      ) : (
        <div className="h-[400px] flex items-center justify-center">
          <text className="text-red-600">No Have Record Data</text>
        </div>
      )}
    </>
  );
};

export default ReservationsClient;

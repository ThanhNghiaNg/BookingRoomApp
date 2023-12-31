"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import {
  createNewNotification,
  pushNotification,
} from "../components/Notification/pushNotification";

interface ReservationsClientProps {
  reservations?: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string, index?: number) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          if (index !== undefined && !!reservations?.length) {
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
    },
    [reservations, router, currentUser]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
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
        {reservations?.map((reservation: any, index) => (
          <ListingCard
            key={reservation.id}
            data={reservation.accommodation}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
            index={index}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;

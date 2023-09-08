"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";

import ListingCard from "@/app/components/listings/ListingCard";
import Calendar from "./Calendar";
import {
  createNewNotification,
  pushNotification,
} from "../components/Notification/pushNotification";
import { TbRuler2Off } from "react-icons/tb";

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

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string, index?: number) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          if (index !== undefined) {
            const notificationData = {
              content: `Your reservation with ${ReservationListData[index].id} ID is canceled`,
              userId: ReservationListData[index].accommodation.userId,
              parnerID: currentUser?.id,
              parnerAvatar: currentUser?.image || undefined,
            };

            pushNotification(notificationData);

            createNewNotification({
              data: [
                `Your reservation with ${ReservationListData[index].id} ID is canceled`,
                ReservationListData[index].accommodation.userId || "",
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
    [router, ReservationListData, currentUser]
  );

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
          2xl:grid-cols-5
          gap-8
        "
        >
          {room.map((reservation: any, index) => {
            return (
              <ListingCard
                key={reservation.id}
                data={reservation}
                currentUser={currentUser}
                onClickCard={() => {
                  onClickCard(reservation);
                }}
                actionId={reservation.id}
                disabled={deletingId === reservation.id}
                index={index}
                editMode={true}
                editPosition="price"
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyOwnClient;

"use client";

import { BsFillBriefcaseFill } from "react-icons/bs";
import { useConfirmCancelModal } from "../../hooks/useConfrimModal";
import Button from "../Button";
import Input from "../inputs/Input";
import Modal from "./Modal";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createNewNotification,
  pushNotification,
} from "../Notification/pushNotification";

function ConfirmCancelModal() {
  const confirmModal = useConfirmCancelModal();

  const reservationsProp: any = {
    reservations: confirmModal.infoRoom?.reservations,
  };

  const handleConfirm = async () => {
    console.log(reservationsProp.reservations);

    const postRefund = await axios.post("/api/create-stripe-refund", {
      paymentId: reservationsProp.reservations.paymentId, // Get paymentId from Database :>>>> just sample
    });

    console.log({ postRefund: postRefund.data });

    const notificationData = {
      content: `Your reservation with is canceled`,
      userId: reservationsProp.reservations.accommodation.userId,
      parnerID: reservationsProp.reservations.userId,
    };

    pushNotification(notificationData);

    createNewNotification({
      data: [
        `Your reservation with  ID is canceled`,
        "Cancel",
        reservationsProp.reservations.userId || "",
      ],
    });
  };

  const bodyContent = (
    <div className="flex flex-col justify-center items-center">
      <text className="text-black font-bold mt-5">Cancel reservation</text>
      <text className="text-center text-gray-500 font-semibold mt-4">
        The reservation fee will be refunded within a few days of being
        confirmed by the host
      </text>
    </div>
  );

  return (
    <Modal
      classNameStyleTitle="text-red-500 font-normal"
      isOpen={confirmModal.isOpen}
      title="Cancel reservation"
      actionLabel="OK"
      secondaryAction={confirmModal.onClose}
      secondaryActionLabel="Cancel"
      onClose={confirmModal.onClose}
      onSubmit={handleConfirm}
      body={bodyContent}
    />
  );
}

export default ConfirmCancelModal;

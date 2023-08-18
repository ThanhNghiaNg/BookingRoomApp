"use client";

import { BsFillBriefcaseFill } from "react-icons/bs";
import useConfirmModal from "../../hooks/useConfrimModal";
import Button from "../Button";
import Input from "../inputs/Input";
import Modal from "./Modal";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";

function ConfirmModal() {
  const router = useRouter();

  const confirmModal = useConfirmModal();

  const updatedQuery: any = {
    startDate: confirmModal.dataParams?.startDate,
    endDate: confirmModal.dataParams?.endDate,
    totalPrice: confirmModal.dataParams?.totalPrice,
    accommodationId: confirmModal.dataParams?.accommodationId,
  };

  const handleConfirm = () => {
    // if (confirmModal.dataParams.startDate) {
    //   updatedQuery.startDate = formatISO(confirmModal.dataParams.startDate);
    // }

    // if (confirmModal.dataParams.endDate) {
    //   updatedQuery.endDate = formatISO(confirmModal.dataParams.startDate);
    // }

    console.log(updatedQuery);

    confirmModal.onClose();

    const url = qs.stringifyUrl(
      {
        url: "/checkout",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // Promise.all([
    //   axios.post(`/api/accommodation/${updatedQuery.accommodationId}`),
    // ]).then(() => {
    //   console.log("checkkk");
    //   window.open(url, "_blank", "noopener,noreferrer");
    // });

    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const getDate = (datetimeString: any) => {
    const dateObject = new Date(datetimeString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;

    return `${day}/${month}`;
  };

  const bodyContent = (
    <div className="flex flex-col justify-center items-center">
      <text className="text-black font-bold mt-5">JOIN TRAVEL</text>
      <text className="text-center text-gray-500 font-semibold mt-4">
        Are you ready to go to this place from{" "}
        {getDate(confirmModal.dataParams?.startDate)} to{" "}
        {getDate(confirmModal.dataParams?.endDate)}
      </text>
      <text className="text-center text-gray-500 font-semibold mt-4">
        For ${confirmModal.dataParams?.totalPrice}, we are sure you will have
        the best experience with this place
      </text>
    </div>
  );

  return (
    <Modal
      classNameStyleTitle="text-red-500 font-normal"
      isOpen={confirmModal.isOpen}
      title="Booking confirmation"
      actionLabel="OK"
      secondaryAction={confirmModal.onClose}
      secondaryActionLabel="Cancel"
      onClose={confirmModal.onClose}
      onSubmit={handleConfirm}
      body={bodyContent}
    />
  );
}

export default ConfirmModal;

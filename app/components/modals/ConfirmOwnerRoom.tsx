"use client";

import { BsFillBriefcaseFill } from "react-icons/bs";
import useConfirmModal, {
  useConfirmOwnerModal,
} from "../../hooks/useConfrimModal";
import Button from "../Button";
import Input from "../inputs/Input";
import Modal from "./Modal";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";

function ConfirmModal() {
  const confirmOwnerModal = useConfirmOwnerModal();

  const handleConfirm = () => {
    confirmOwnerModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col justify-center items-center">
      <text className="text-black font-bold mt-5">Knock knock</text>
      <text className="text-center text-gray-500 font-semibold mt-4">
        You have fully described your accommodation
      </text>
      <text className="text-center text-gray-500 font-semibold mt-4">
        Because we want to make sure you give the best description of the place
        you want to rent
      </text>
    </div>
  );

  return (
    <Modal
      classNameStyleTitle="text-red-500 font-normal"
      isOpen={confirmOwnerModal.isOpen}
      title="Booking confirmation"
      actionLabel="OK"
      secondaryAction={confirmOwnerModal.onClose}
      secondaryActionLabel="Cancel"
      onClose={confirmOwnerModal.onClose}
      onSubmit={handleConfirm}
      body={bodyContent}
    />
  );
}

export default ConfirmModal;

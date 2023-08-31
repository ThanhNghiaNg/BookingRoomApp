import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Transition } from "@headlessui/react";

export default function CloseIconButton({ onClick }: { onClick: () => void }) {
  return (
    <Transition
      show={true} // Set this to conditionally control the visibility of the IconButton
      as={Fragment}
    >
      <button
        className="absolute top-0 right-0 p-2 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-300"
        onClick={onClick}
      >
        <span className="sr-only">Close</span>
        <AiOutlineClose className="w-6 h-6" />
      </button>
    </Transition>
  );
}

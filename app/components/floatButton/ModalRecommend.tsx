"use client";

import { BsFillBriefcaseFill } from "react-icons/bs";
import useConfirmModal from "../../hooks/useConfrimModal";
import Button from "../Button";
import Input from "../inputs/Input";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "../modals/Modal";
import { useState } from "react";
import useChatRecommendModal from "../../hooks/useChatRecommendModal";

function ChatRecommendModal() {
  const useChatRecommend = useChatRecommendModal();

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleReturnOutput = () => {
    // Perform some processing with inputValue and set outputValue
    const processedOutput = `Processed: ${inputValue}`;
    setOutputValue(processedOutput);
  };

  const bodyContent = (
    <div className="p-8 bg-white rounded-lg shadow-md w-min-[60%]">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter input..."
        value={inputValue}
        onChange={handleInputChange}
      />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleReturnOutput}
      >
        Process Input
      </button>

      <div className="mt-4">
        <p>Output: {outputValue}</p>
      </div>
    </div>
  );

  return (
    <Modal
      classNameStyleTitle="text-red-500 font-normal"
      isOpen={useChatRecommend.isOpen}
      title="Booking confirmation"
      actionLabel="Let try"
      onClose={useChatRecommend.onClose}
      onSubmit={useChatRecommend.onClose}
      body={bodyContent}
      width="max-w-7xl"
      disabledSubmitButton={true}
    />
  );
}

export default ChatRecommendModal;

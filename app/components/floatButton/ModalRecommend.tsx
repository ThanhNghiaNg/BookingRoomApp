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
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { travelData } from "./dataFake";

function ChatRecommendModal() {
  const useChatRecommend = useChatRecommendModal();

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [accommodationsRecommned, setAccommodationsRecommned] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    //TODO: call API to get output handleReturnOutput() and set outputValue
  };

  const handleReturnOutput = () => {
    // Perform some processing with inputValue and set outputValue
    const processedOutput = `Processed: ${inputValue}`;
    setOutputValue(processedOutput); // TODO: set output value form ChatGPT API
  };

  // TODO: get data from ChatGPT API and split to locations

  const locations: string[] = [];

  const extractedLocations = travelData.match(/[^\n:]+(?=:)/g);

  if (extractedLocations) {
    extractedLocations.forEach((item) => {
      const trimmedLocation = item.trim();
      locations.push(trimmedLocation);
    });
  }

  const handleSearch = async () => {
    const response = await axios.post(`/api/accommodation/chatAI`, {
      locations,
    });
    setAccommodationsRecommned(response.data);

    console.log(response.data);
  };

  const bodyContent = (
    <div className="px-8  w-min-[60%]">
      <div className="p-4 bg-transparent flex items-center justify-between">
        <div className="relative flex w-full flex-wrap items-stretch mb-3">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Please provide your wishes and description about the place you want to go. "
            className="px-3 py-3 placeholder-slate-400 text-slate-800 relative bg-white rounded text-lg border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
          />
          <span className="z-10 h-full leading-snug font-normal text-center text-slate-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
            <AiOutlineSearch size={25} onClick={handleSearch} />
          </span>
        </div>
      </div>
      <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1 className="text-amber-600">The AI Tool for</h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypewriterComponent
              options={{
                strings: ["Location.", "Traveling.", "Food.", "Stay station."],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
          Find the best place for you through AI.
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      classNameStyleTitle="text-red-500 font-normal"
      isOpen={useChatRecommend.isOpen}
      title=""
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

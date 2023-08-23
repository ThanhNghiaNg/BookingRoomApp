import React, { useEffect, useState } from "react";
import ModernLottieButton from "./ModernLottieButton";
import Button from "../Button";
import { AiFillCloseCircle } from "react-icons/ai";

interface FloatingButtonProps {}

const FloatingButton: React.FC<FloatingButtonProps> = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [haveClick, setHaveClick] = useState<boolean>(false);

  const messages: string[] = [
    "Discover the natural beauty of Vietnam!",
    "Embark on a journey through Vietnam's diverse culture!",
    "Capture stunning images from the North to the South!",
    "Explore sacred temples and majestic landscapes!",
    "Experience unique and diverse culinary delights in Vietnam!",
    "Uncover famous destinations and hidden gems behind Vietnam's beauty!",
  ];

  const displayMessage = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setIsMessageVisible(true);
  };

  const hideMessage = () => {
    setIsMessageVisible(false);
  };

  const onActionClick = () => {
    hideMessage();
    setHaveClick(true);
    const tiemOut = setTimeout(() => {
      displayMessage();
    }, 200000); // Tắt sau rồi hiển thị lại sau 2 giây

    return clearTimeout(tiemOut);
  };

  const buttonClick = () => {
    hideMessage();
    setHaveClick(true);
    displayMessage();
  };

  useEffect(() => {
    displayMessage();
  }, []);

  useEffect(() => {
    if (!haveClick) {
      const intervalId = setInterval(() => {
        hideMessage();
        setTimeout(() => {
          displayMessage();
        }, 500000); // Hiển thị lại sau 5 giây
      }, 300000 + 500000); // Tắt sau 3 giây, sau đó sau 5 giây hiển thị lại

      return () => {
        clearInterval(intervalId);
      };
    } else {
      const tiemOut = setTimeout(() => {
        hideMessage();
        setHaveClick(false);
      }, 500000);

      return () => {
        clearTimeout(tiemOut);
      };
    }
  }, [haveClick]);

  return (
    <div className="flex">
      {isMessageVisible && (
        <div className="flex justify-between bg-white border rounded-lg px-4 py-2 shadow-md max-w-[300px]">
          <div className="">
            {message}{" "}
            <button
              className="text-red-500 underline hover:text-red-400"
              onClick={() => console.log("Click")}
            >
              Click here
            </button>
          </div>
          <button className=" text-red-500" onClick={onActionClick}>
            <AiFillCloseCircle size={"20px"} />
          </button>
        </div>
      )}
      <button
        onClick={buttonClick}
        className="p-2 bg-gray-400 hover:bg-gray-300 text-gray-800 rounded-full shadow-md ml-5"
      >
        <ModernLottieButton />
      </button>
    </div>
  );
};

export default FloatingButton;

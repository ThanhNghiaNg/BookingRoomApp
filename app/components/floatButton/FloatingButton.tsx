import React, { useEffect, useState } from "react";
import ModernLottieButton from "./ModernLottieButton";

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
    }, 2000); // Tắt sau rồi hiển thị lại sau 2 giây

    return clearTimeout(tiemOut);
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
        }, 5000); // Hiển thị lại sau 5 giây
      }, 3000 + 5000); // Tắt sau 3 giây, sau đó sau 5 giây hiển thị lại

      return () => {
        clearInterval(intervalId);
      };
    } else {
      const tiemOut = setTimeout(() => {
        hideMessage();
        setHaveClick(false);
      }, 5000);

      return () => {
        clearTimeout(tiemOut);
      };
    }
  }, [haveClick]);

  return (
    <div>
      <button
        onClick={onActionClick}
        className="p-2 bg-gray-400 hover:bg-gray-300 text-gray-800 rounded-full shadow-md"
      >
        <ModernLottieButton />
      </button>
      {isMessageVisible && (
        <div className="mt-2 bg-white border rounded-lg p-2 shadow-md">
          {message}
          <button className="ml-2 text-gray-500" onClick={onActionClick}>
            Đóng
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;

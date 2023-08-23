import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import animationData from "@/public/animation/animation.json";

const ModernLottieButton = () => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    anim.addEventListener("complete", () => {
      anim.pause();
    });

    return () => anim.destroy(); // Hủy animation khi component bị hủy
  }, []);

  return (
    <div ref={animationContainer} style={{ width: "50px", height: "50px" }} />
  );
};

export default ModernLottieButton;

"use client";

import { useEffect, useState } from "react";
import Search from "./Search";

const ScrollAnimation = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setShowNavbar(window.scrollY > threshold);
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed z-30 top-3 left-1/2 transform -translate-x-1/2 w-[20%] h-16 transition-all duration-300 ease-in-out  ${
        showNavbar ? "opacity-100" : "opacity-0"
      }`}
    >
      <Search />
    </nav>
  );
};

export default ScrollAnimation;

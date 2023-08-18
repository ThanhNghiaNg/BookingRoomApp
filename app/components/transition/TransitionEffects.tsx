"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "./WaterText";

const TransitionEffect = (): JSX.Element => {
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    setIsAnimated(true);
  }, []);
  return (
    <>
      {!isAnimated && <Loader />}

      {isAnimated && (
        <>
          <motion.div
            className="fixed top-0 bottom-0 z-30 w-screen h-screen right-full bg-primary"
            initial={{ x: "100%", width: "100%" }}
            animate={{ x: "0%", width: "0%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.div
            className="fixed top-0 bottom-0 z-20 w-screen h-screen right-full bg-dark"
            initial={{ x: "100%", width: "100%" }}
            animate={{ x: "0%", width: "0%" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          />
          <motion.div
            className="fixed top-0 bottom-0 z-10 w-screen h-screen right-full bg-light"
            initial={{ x: "100%", width: "100%" }}
            animate={{ x: "0%", width: "0%" }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
          />
        </>
      )}
    </>
  );
};

export default TransitionEffect;

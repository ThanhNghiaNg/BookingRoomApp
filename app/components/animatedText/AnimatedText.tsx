import React from "react";
import "./AnimatedText.css"; // Import the CSS file containing the animation styles
import { motion } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  classname?: string;
};

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const AnimatedText = ({
  text,
  classname = "",
}: AnimatedTextProps): JSX.Element => {
  const words = text.split(" ");

  return (
    <div
      className={`flex items-center justify-center w-full py-2 mx-auto overflow-hidden text-center sm:py-0`}
    >
      <motion.h1
        className={`animated-text inline-block w-full text-dark font-bold text-5xl ${classname}`}
        variants={quote}
        initial="initial"
        //animate="animate"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="word-animation"
            variants={singleWord}
            viewport={{ once: true }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;

"use client";

import React, { useEffect, useState } from "react";
import "./ParallaxHome.css";

// import roadImg from "/images/ParallaxHero/road.png";
// import sunImg from "/images/ParallaxHero/sun.png";
// import mountain from "/images/ParallaxHero/mountain.png";
// import bgImg from "/images/ParallaxHero/bg.png";
import Image from "next/image";
import AnimatedText from "../animatedText/AnimatedText";
import Link from "next/link";
import Search from "../navbar/Search";

const parrallax = {
  backgroundImage: `url("https://res.cloudinary.com/dqrm0sqsu/image/upload/v1693752971/photo-1653537276528-7814aee01641_k8lcgw.avif")`,
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ParallaxHome = () => {
  return (
    <div className="relative mt-[-80px]">
      {/* <Image
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full mt-[-7rem] absolute object-cover"
        src="/images/ParallaxHero/HeroBackground.jpg"
        alt="destination image"
      /> */}
      <div
        style={parrallax}
        className="relative flex items-center justify-center xl:mx-[-80px] width-full h-[100vh]"
      >
        <div className="absolute flex flex-col items-center justify-center">
          <AnimatedText
            text="Travel Nest"
            classname=" xl:!text-[7rem] text-rose-600
          lg:!text-[5rem]
          md:!text-[3rem]
          sm:!text-[1rem]"
          />
          <p className="my-7 text-8xl text-[#f7f7f7] md:text-lg sm:text-xs">
            Easily find places to: Stay, Eat, Shop or Visit from our Partners or
            Local bussinesses.
          </p>
          <div className="flex items-center w-full gap-5 my-5 justify-center">
            <Search />

            {/* <Link href="mailto: abc@gmail.com " target={"_blank"}>
              <button className="p-2 px-8 font-bold border-2 text-light rounded-xl border-primary bg-primary hover:text-dark">
                Contact us
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHome;

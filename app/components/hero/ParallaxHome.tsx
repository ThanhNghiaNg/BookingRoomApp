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
  backgroundImage: `url("https://images.unsplash.com/photo-1555979864-7a8f9b4fddf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")`,
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
            classname=" xl:!text-[7rem] text-[#f16868]
          lg:!text-[5rem]
          md:!text-[3rem]
          sm:!text-[1rem]"
          />
          <p className="my-10 text-8xl text-[#f8d6d6] md:text-lg sm:text-xs">
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

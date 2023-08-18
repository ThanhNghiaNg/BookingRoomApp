import Image from "next/image";
import AnimatedText from "../animatedText/AnimatedText";

import HomeHero_1 from "../../../public/images/homeHero-1.jpeg";
import homeHero_3 from "../../../public/images/homeHero-3.jpeg";
import homeHero_2 from "../../../public/images/homeHero-2.jpeg";
import PlaneAnimation from "../../../public/gifs/paper-airplan.gif";
import ClientOnly from "../ClientOnly";

export default function HomeHero() {
  return (
    <div className="relative flex flex-row gap-2 mt-5">
      {/* Welcome section */}
      <div className="relative flex-1">
        <AnimatedText
          text="Welcome to"
          classname="!text-left
          xl:!text-5xl
          lg:!text-4xl
          md:!text-2xl
          sm:!text-md"
        />
        <AnimatedText
          text="Travel Nest!"
          classname="my-4
          text-primary
          !text-left
          xl:!text-8xl
          lg:!text-7xl
          md:!text-5xl
          sm:!text-xl"
        />
        <p className="my-5 text-4xl md:text-lg sm:text-xs">
          Easily find places to: Stay, Eat, Shop or Visit from our Partners or
          Local bussinesses.
        </p>

        {/* <Image
          src={PlaneAnimation}
          alt="Plane Gif"
          className="text-center w-[300px] h-[300px]"
        /> */}
      </div>

      {/* Image section */}
      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className="flex flex-col gap-2 grid-col-span-1">
          <div className="flex-1">
            <Image
              width={0}
              height={0}
              src="/images/homeHero-1.jpeg"
              alt="Hero banner 1"
              className="w-full h-auto rounded-2xl floatedImage"
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex-1">
            <Image
              width={0}
              height={0}
              src="/images/homeHero-2.jpeg"
              alt="Hero banner 2"
              className="w-full h-auto rounded-2xl grid-row-span-1 "
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="grid-col-span-1">
          <Image
            width={0}
            height={0}
            src="/images/homeHero-3.jpeg"
            alt="Hero banner 3"
            className="w-full h-auto mt-6 shadow-2xl rounded-2xl "
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";

const GetStartedBanner = () => {
  return (
    <div className="flex-col justify-center p-10 mt-[100px] bg-primary rounded-xl items-center text-center">
      <h1 className="text-4xl font-bold text-light">
        Get started with Travel Nest
      </h1>
      <p className="my-8 text-light">
        Subscribe and find super attractive price quotes from us. <br /> Find
        your hotel soon.
      </p>
      <Link href="mailto: abc@gmail.com " target={"_blank"}>
        <button className="font-bold border-2 text-light p-2 rounded-xl hover:border-dark hover:text-dark">
          Get started
        </button>
      </Link>
    </div>
  );
};

export default GetStartedBanner;

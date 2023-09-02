"use client";

import {
  TwitterSquareFilled,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col w-full xl:px-20 md:px-10 xl:py-10 md:py-5 bg-[#f8f8f8]">
      <div className="flex flex-row pb-[20px] gap-[10px] justify-between">
        <div className="flex flex-col flex-1">
          <h1 className="font-bold uppercase xl:text-xl md:text-lg text-primary">
            Travel Nest
          </h1>
          <p className="hidden my-4 xl:block">
            Journey Through Vietnam, Rest with Travelnest
          </p>
          <ul className="flex">
            <Link
              href="https://www.facebook.com/tonducthanguniversity"
              target={"_blank"}
            >
              <li className="">
                <TwitterSquareFilled
                  className="mr-3 xl:text-3xl md:text-2xl hover:translate-y-[-2px] transition cursor-pointer"
                  rev={undefined}
                />
              </li>
            </Link>
            <Link
              href="https://www.facebook.com/tonducthanguniversity"
              target={"_blank"}
            >
              <li>
                <FacebookFilled
                  className="mr-3 xl:text-3xl md:text-2xl hover:translate-y-[-2px] transition cursor-pointer"
                  rev={undefined}
                />
              </li>
            </Link>

            <Link
              href="https://www.facebook.com/tonducthanguniversity"
              target={"_blank"}
            >
              <li>
                <LinkedinFilled
                  className="xl:text-3xl md:text-2xl hover:translate-y-[-2px] transition cursor-pointer"
                  rev={undefined}
                />
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col flex-1" />
        <div className="flex flex-col flex-1" />
        <div className="flex flex-col flex-1" />
        <div className="flex flex-col flex-1">
          <div className="font-bold xl:text-xl md:text-md text-end">
            Contact Us
          </div>
          <ul className="my-4 xl:text-lg md:text-sm text-end">
            <li>Team N082</li>
            <li className="mt-1">travelnest@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center pt-4 border-t-[1px] xl:text-lg md:text-sm">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default Footer;

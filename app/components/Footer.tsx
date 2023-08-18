"use client";

import {
  TwitterSquareFilled,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="flex flex-col w-full xl:px-20 md:px-10 xl:py-10 md:py-5 bg-[#f8f8f8]">
      <div className="flex flex-row pb-[20px] gap-[10px]">
        <div className="flex flex-col flex-1">
          <h1 className="font-bold uppercase xl:text-xl md:text-lg text-primary">
            Travel Nest
          </h1>
          <p className="hidden my-4 xl:block">
            Easily find places to: Stay, Eat, Shop or Visit from our Partners or
            Local bussinesses.
          </p>
          <ul className="flex">
            <li className="">
              <TwitterSquareFilled
                className="mr-3 xl:text-3xl md:text-2xl hover:translate-y-[-2px] transition cursor-pointer"
                rev={undefined}
              />
            </li>
            <li>
              <FacebookFilled
                className="mr-3 xl:text-3xl md:text-2xl hover:translate-y-[-2px] transition cursor-pointer"
                rev={undefined}
              />
            </li>
            <li>
              <LinkedinFilled
                className="xl:text-3xl md:text-2xl hover:translate-y-[-2px] transition cursor-pointer"
                rev={undefined}
              />
            </li>
          </ul>
        </div>
        <div className="flex flex-col flex-1">
          <div className="font-bold xl:text-xl md:text-md">About Us</div>
          <ul className="my-4 xl:text-lg md:text-sm">
            <li>Feature</li>
            <li className="mt-1">FAQs</li>
            <li className="mt-1">Reviews</li>
          </ul>
        </div>
        <div className="flex flex-col flex-1">
          <div className="font-bold xl:text-xl md:text-md">Resources</div>
          <ul className="my-4 xl:text-lg md:text-sm">
            <li>Privacy</li>
            <li className="mt-1">Policy</li>
            <li className="mt-1">Payment</li>
          </ul>
        </div>
        <div className="flex flex-col flex-1">
          <div className="font-bold xl:text-xl md:text-md">Contact Us</div>
          <ul className="my-4 xl:text-lg md:text-sm">
            <li>+01 23456789</li>
            <li className="mt-1">travelnest@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t-[1px] xl:text-lg md:text-sm">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex gap-10">
          <span>Contact Us</span>
          <span>Terms</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import { Image, Image as Img } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Search from "../navbar/Search";

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export function HeroSection() {
  return (
    <div className="relative">
      <img
        className="absolute inset-0 w-full h-full object-cover object-top"
        src={
          "https://images.unsplash.com/photo-1689832870997-18b825b4b676?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
        }
        alt="Random background image"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full bg-purple-900 bg-opacity-30 backdrop-blur-sm"
      ></div>
      <div className="relative container m-auto px-6 md:px-12 lg:px-6">
        <div className="mb-12 pt-40 space-y-16 md:mb-20 md:pt-56 lg:w-8/12 lg:mx-auto">
          <h1 className="text-white text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Tìm chỗ nghỉ tiếp theo...
          </h1>
          <h3 className="text-white text-center text-xl font-bold sm:text-4xl md:text-5xl">
            Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
          </h3>
          <div className="w-full ">
            <Search />
          </div>
        </div>

        <div className="pb-16">
          <div className="md:px-12">
            <span className="block text-center font-medium text-pink-50">
              Trusted by your favorite giants
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

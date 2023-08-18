"use client";

import { Button } from "antd";
import ListingCard from "./ListingCard";
import Image from "next/image";
import {
  SafeAccommodation,
  SafeListing,
  SafeReservation,
  SafeUser,
} from "@/app/types";
import { motion } from "framer-motion";

import { EnvironmentOutlined } from "@ant-design/icons";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//destination assets
import dalat from "../../../public/images/destination/dalat.jpg";
import danang from "../../../public/images/destination/danang.png";
import hanoi from "../../../public/images/destination/hanoi.jpg";
import nhatrang from "../../../public/images/destination/nhatrang.jpg";
import TPHCM from "../../../public/images/destination/TPHCM.jpeg";
import vungtau from "../../../public/images/destination/vungtau.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { set } from "date-fns";
import AnimatedText from "../animatedText/AnimatedText";

const destinations = [
  {
    id: 1,
    name: "Nha Trang",
    amount: "",
    image:
      "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1691810181/samples/landscapes/nhatrang_eda3j4.jpg",
  },
  {
    id: 2,
    name: "Vũng Tàu",
    amount: "",
    image:
      "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1691810165/samples/landscapes/vungtau_yurlos.jpg",
  },
  {
    id: 3,
    name: "Đà Lạt",
    amount: "",
    image:
      "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1691810164/samples/landscapes/dalat_b1jflc.jpg",
  },
  {
    id: 4,
    name: "Đà Nẵng",
    amount: "",
    image:
      "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1691810168/samples/landscapes/danang_jpqglr.png",
  },
  {
    id: 5,
    name: "TP Hồ Chí Minh",
    amount: "",
    image:
      "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1691810164/samples/landscapes/TPHCM_wfwcno.jpg",
  },
  {
    id: 6,
    name: "Hà Nội",
    amount: "",

    image:
      "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1691810164/samples/landscapes/hanoi_sdictp.jpg",
  },
];

interface ListingHotelProps {
  text: string;
  subtext?: string;
  btnText?: string;
  type?: string;
  data?: Array<any>;
  btnHref: string;
  currentUser?: SafeUser | null;
}

type trendingLocationsWithInfo = {
  accommodationId: string;
  address: string;
  area: string;
  count: number;
};

const ListingHotel = ({
  text,
  subtext = "",
  btnText = "Explore More",
  type,
  data = [],
  btnHref = "",
  currentUser = null,
}: ListingHotelProps) => {
  const [luxuryHotels, setLuxuryHotels] = useState<SafeListing[]>([]);
  const [newHotel, setNewHotel] = useState<SafeListing[]>([]);
  const [trendingLocations, setTrendingLocations] = useState<
    trendingLocationsWithInfo[]
  >([]);

  const popularHotels = data;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1, // Số hàng
    slidesPerRow: 5, // Số phần tử trên mỗi hàng
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/acommodationLux")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setLuxuryHotels(data);
      });

    fetch("/api/acommodationLux/new")
      .then((res) => res.json())
      .then((data) => {
        setNewHotel(data);
      });

    fetch("/api/acommodationLux/trendingLocation")
      .then((res) => res.json())
      .then((data) => {
        setTrendingLocations(data);
      });
  }, []);

  return (
    <div className="flex-col pt-10 mt-[50px]">
      <div className="flex items-center justify-between">
        <motion.div initial="offscreen" whileInView="onscreen">
          <AnimatedText
            text={text}
            classname="my-4 font-extrabold text-left xl:text-4xl md:text-3xl"
          />
          {/* <h1 className="my-4 font-extrabold xl:text-4xl md:text-3xl">
            {text}
          </h1> */}
          <h3>{subtext}</h3>
        </motion.div>

        <Link href={btnHref}>
          <Button>{btnText}</Button>
        </Link>
      </div>

      {data &&
        type === "luxury" &&
        (loading ? (
          <div className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Carousel
            swipeable={true}
            draggable={true}
            ssr={true} // means to render carousel on server-side.
            arrows={true}
            showDots={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 2,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 3,
                slidesToSlide: 1,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
              },
            }}
          >
            {luxuryHotels.map((element: SafeAccommodation) => (
              <div
                key={element.id}
                className="relative flex flex-1 h-full w-128"
              >
                <div
                  id="app"
                  className="flex flex-row bg-white rounded shadow-2xl h-60 card text-grey-darkest"
                >
                  <img
                    className="w-1/2 h-full rounded-l-sm"
                    src={element.image}
                    alt="Room Image"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex-1 p-4 pb-0">
                      <h3 className="mb-1 font-light text-grey-darkest">
                        Tower Hotel
                      </h3>
                      <div className="flex items-center mb-4 text-xs">
                        <EnvironmentOutlined rev={undefined} className="mr-2" />
                        {element.address}
                      </div>
                      <span className="text-3xl text-grey-darkest">
                        {element.pricesPerDate}
                        <span className="text-lg">/night</span>
                      </span>
                      <div className="flex items-center mt-4">
                        <div className="card-actions">
                          {element.convenient
                            .slice(0, 2)
                            .map((element: any, index: number) => (
                              <div
                                key={index}
                                className="font-light badge badge-secondary badge-outline text-neutral-500"
                              >
                                {element}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 transition cursor-pointer">
                      Book Now
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        ))}

      {data && type === "new" && (
        <div>
          <Carousel
            swipeable={true}
            draggable={true}
            ssr={true} // means to render carousel on server-side.
            arrows={true}
            showDots={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5,
                slidesToSlide: 2,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 3,
                slidesToSlide: 1,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
              },
            }}
          >
            {newHotel.map((element: SafeAccommodation) => (
              <div className="mx-3 mt-4 mb-7" key={element.id}>
                <ListingCard
                  currentUser={currentUser}
                  key={element.id}
                  data={element}
                />{" "}
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {data && type === "popular" && (
        <div>
          <Carousel
            swipeable={true}
            draggable={true}
            ssr={true} // means to render carousel on server-side.
            arrows={true}
            showDots={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5,
                slidesToSlide: 2,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 3,
                slidesToSlide: 1,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
              },
            }}
          >
            {popularHotels.map((element: SafeAccommodation) => (
              <div className="mx-3 mt-4 mb-7" key={element.id}>
                <ListingCard
                  currentUser={currentUser}
                  key={element.id}
                  data={element}
                />{" "}
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {data && type === "explore" && (
        <div className="flex gap-8 mt-4">
          {destinations.map((destination) => (
            <div className="flex-col flex-1" key={destination.id}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[150px] object-cover rounded-2xl border-[#EEEEEE] border-2 shadow-2xl cursor-pointer hover:translate-y-[-10px] transition"
                src={destination.image}
                alt="destination image"
              />

              <h5 className="flex-1 my-2 text-xl font-bold">
                {destination.name}
              </h5>
              {destination.amount && (
                <p className="flex-1">{destination.amount} chỗ nghỉ</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data && type === "trending" && (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[350px] relative cursor-pointer"
                src={destinations[0].image}
                alt="destination image"
              />
              <p className="absolute top-[20px] left-[10px] text-2xl text-light font-bold drop-shadow-md">
                {destinations[0].name}
              </p>
            </div>
            <div className="relative flex-1">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[350px] relative cursor-pointer"
                src={destinations[1].image}
                alt="destination image"
              />
              <p className="absolute top-[20px] left-[10px] text-2xl text-light font-bold drop-shadow-md">
                {destinations[1].name}
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[300px] relative cursor-pointer"
                src={destinations[2].image}
                alt="destination image"
              />
              <p className="absolute top-[20px] left-[10px] text-2xl text-light font-bold drop-shadow-md">
                {destinations[2].name}
              </p>
            </div>
            <div className="relative flex-1">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[300px] relative cursor-pointer"
                src={destinations[3].image}
                alt="destination image"
              />
              <p className="absolute top-[20px] left-[10px] text-2xl text-light font-bold drop-shadow-md">
                {destinations[3].name}
              </p>
            </div>
            <div className="relative flex-1">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[300px] relative cursor-pointer"
                src={destinations[4].image}
                alt="destination image"
              />
              <p className="absolute top-[20px] left-[10px] text-2xl text-light font-bold drop-shadow-md">
                {destinations[4].name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingHotel;

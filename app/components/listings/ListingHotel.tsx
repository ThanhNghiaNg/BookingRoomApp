"use client";

import { Button, Tooltip } from "antd";
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

import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { formatISO, set } from "date-fns";
import AnimatedText from "../animatedText/AnimatedText";
import queryString from "query-string";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const router = useRouter();

  const searchHandler = (locationValue: string) => {
    const updatedQuery: any = {
      locationValue: locationValue,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
    };

    updatedQuery.startDate = formatISO(new Date());

    updatedQuery.endDate = formatISO(new Date());

    updatedQuery.page = 1;
    updatedQuery.pageSize = 8;
    const url = queryString.stringifyUrl(
      {
        url: "/search-accomodation",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    Promise.all([
      () => {
        if (!currentUser) return;
        axios.post(`/api/search-accommodation`, {
          locationValue,
        });
      },
    ]).then(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/acommodationLux")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setLuxuryHotels(data);
      });

    fetch("/api/acommodationLux/popular")
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

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
    1480: { items: 4 },
    1790: { items: 5 },
  };

  const responsiveLux = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 2 },
    1480: { items: 3 },
    1790: { items: 4 },
  };

  return (
    <div className="flex-col pt-10 mt-[50px]" suppressHydrationWarning>
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
          <Button
            onClick={() => {
              searchHandler(" ");
            }}
          >
            {btnText}
          </Button>
        </Link>
      </div>

      {data &&
        type === "luxury" &&
        (loading ? (
          <Skeleton
            style={{ marginRight: "20px", height: "250px" }}
            containerClassName="avatar-skeleton"
          />
        ) : (
          <AliceCarousel
            responsive={responsiveLux}
            mouseTracking
            infinite
            renderPrevButton={() => {
              return (
                <MdNavigateBefore
                  size={40}
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 20,
                    cursor: "pointer",
                  }}
                />
              );
            }}
            renderNextButton={() => {
              return (
                <MdNavigateNext
                  size={40}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 20,
                    cursor: "pointer",
                  }}
                />
              );
            }}
          >
            {luxuryHotels.map((element: SafeAccommodation) => (
              <div
                key={element.id}
                className="card relative flex rounded flex-1 h-full w-128 m-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                <div className="flex flex-row bg-white  h-60 text-grey-darkest">
                  <img
                    className="w-1/2 h-full rounded-l-sm p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] "
                    src={element.image}
                    alt="Room Image"
                  />
                  <div className="flex flex-col ">
                    <div className="flex-1 p-4 pb-0">
                      <Tooltip placement="bottom" title={element.title}>
                        <h2 className="mb-1 font-light text-grey-darkest truncate w-[150px]">
                          {element.title}
                        </h2>
                      </Tooltip>
                      <div className="flex items-center mb-4 text-base">
                        <EnvironmentOutlined rev={undefined} className="mr-2" />
                        <text>{element.area}</text>
                      </div>
                      <span className="text-3xl text-grey-darkest">
                        <text>{element?.pricesPerDate}</text>
                        <span className="text-lg">
                          <text> /night</text>
                        </span>
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
                    <div
                      className="flex items-center justify-center text-cyan-800 p-3 transition cursor-pointer"
                      onClick={() =>
                        router.push(`/accommodation/${element.id}`)
                      }
                    >
                      <text>Book Now</text>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </AliceCarousel>
        ))}

      {data && type === "new" && (
        <div>
          <AliceCarousel
            responsive={responsive}
            mouseTracking
            infinite
            renderPrevButton={() => {
              return (
                <MdNavigateBefore
                  size={40}
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 20,
                    cursor: "pointer",
                  }}
                />
              );
            }}
            renderNextButton={() => {
              return (
                <MdNavigateNext
                  size={40}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 20,
                    cursor: "pointer",
                  }}
                />
              );
            }}
          >
            {popularHotels.map((element: SafeAccommodation) => (
              <div key={element.id}>
                <ListingCard
                  currentUser={currentUser}
                  key={element.id}
                  data={element}
                />{" "}
              </div>
            ))}
          </AliceCarousel>
        </div>
      )}

      {data && type === "popular" && (
        <div>
          <AliceCarousel
            responsive={responsive}
            mouseTracking
            infinite
            renderPrevButton={() => {
              return (
                <MdNavigateBefore
                  size={40}
                  style={{ position: "absolute", left: 0, bottom: 20 }}
                />
              );
            }}
            renderNextButton={() => {
              return (
                <MdNavigateNext
                  size={40}
                  style={{ position: "absolute", right: 0, bottom: 30 }}
                />
              );
            }}
          >
            {newHotel.map((element: SafeAccommodation) => (
              <div key={element.id}>
                <ListingCard
                  currentUser={currentUser}
                  key={element.id}
                  data={element}
                />{" "}
              </div>
            ))}
          </AliceCarousel>
        </div>
      )}

      {data && type === "explore" && (
        <div className="flex gap-8 mt-4">
          {destinations.map((destination) => (
            <div
              className="flex-col flex-1"
              key={destination.id}
              onClick={() => {
                searchHandler(destination.name);
              }}
            >
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
                onClick={() => {
                  searchHandler(destinations[0].name);
                }}
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
                onClick={() => {
                  searchHandler(destinations[1].name);
                }}
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
                onClick={() => {
                  searchHandler(destinations[2].name);
                }}
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
                onClick={() => {
                  searchHandler(destinations[3].name);
                }}
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
                onClick={() => {
                  searchHandler(destinations[4].name);
                }}
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

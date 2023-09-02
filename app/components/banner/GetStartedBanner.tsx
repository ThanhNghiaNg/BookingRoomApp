"use client";
import axios from "axios";
import { formatISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import queryString from "query-string";

const GetStartedBanner = () => {
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
        axios.post(`/api/search-accommodation`, {
          locationValue,
        });
      },
    ]).then(() => {
      router.push(url);
    });
  };
  return (
    <div className="flex-col justify-center p-10 mt-[100px] bg-primary rounded-xl items-center text-center">
      <h1 className="text-4xl font-bold text-light">
        Get started with Travel Nest
      </h1>
      <p className="my-8 text-light">
        Find super attractive quotes from the best rooms we have to offer.{" "}
        <br /> Find your hotel soon.
      </p>
      <button
        onClick={() => {
          searchHandler(" ");
        }}
        className="font-bold border-2 text-light p-2 rounded-xl hover:border-dark hover:text-dark"
      >
        Get started
      </button>
    </div>
  );
};

export default GetStartedBanner;

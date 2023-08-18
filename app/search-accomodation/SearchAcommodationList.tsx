"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ListingCard from "../components/listings/ListingCard";
import { useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";
import { debounce } from "@mui/material";
import EmptyState from "../components/EmptyState";

type Props = {
  accommodationsProps: any;
  currentUser: any;
  resetPage?: boolean;
  setResetPageInfo?: (value: boolean) => void;
};

export default function SearchAcommodationList({
  accommodationsProps,
  currentUser,
  resetPage,
  setResetPageInfo,
}: Props) {
  const [accommodations, setAccommodations] = useState([]);
  const [prevResult, setPrevResult] = useState("[]");

  useEffect(() => {
    // const strAccommodationsProps = JSON.stringify(accommodationsProps);
    // if (prevResult != strAccommodationsProps) {
    //   setAccommodations((prev) => {
    //     return resetPage
    //       ? accommodationsProps
    //       : [...prev, ...accommodationsProps];
    //   });
    //   if (resetPage) {
    //     setResetPageInfo?.(false);
    //   }
    //   setPrevResult(strAccommodationsProps);
    // }
    setAccommodations(accommodationsProps);
  }, [accommodationsProps]);

  // ----------------------------------------------------------------------------------------------------------
  const router = useRouter();
  const params = useSearchParams();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 8,
  });

  useEffect(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      ...pageInfo,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/search-accomodation",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [pageInfo]);

  const handleScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 500) {
      setPageInfo((prev) => {
        // prev.page + 1;
        return { ...prev, page: prev.page + 1 };
      });
    }
  };
  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 500);
    window.addEventListener("scroll", handleDebouncedScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (accommodations.length === 0) {
    return (
      <div className="flex justify-center w-full col-span-4">
        <EmptyState></EmptyState>
      </div>
    );
  }
  return (
    <>
      {accommodations?.map((accom: any) => (
        <ListingCard currentUser={currentUser} key={accom.id} data={accom} />
      ))}
    </>
  );
}

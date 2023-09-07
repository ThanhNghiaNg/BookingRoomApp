"use client";
import React, { useEffect, useState, useMemo } from "react";
import Container from "../components/Container";
import { SafeUser } from "../types";
import SearchAccomodationFilter from "../components/search-accommodation/SearchAccomodationFilter";
import SeachAccomodationCard from "../components/search-accommodation/SearchAccomodationCard";
import EmptyState from "../components/EmptyState";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import ListingCard from "../components/listings/ListingCard";
import SearchFilter from "./SearchFilter";
import SearchAcommodationList from "./SearchAcommodationList";

type Props = {
  accommodationsProps: any;
  filtersProps: any;
  currentUser?: SafeUser | null;
  searchParams?: any;
};
type FilterAccommodationParams = {
  featured: string[];
  convenient: string[];
  properties: string;
};

export default function SearchAccommodationClient({
  accommodationsProps,
  filtersProps,
  currentUser,
  searchParams,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [resetPageInfo, setResetPageInfo] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] =
    useState<FilterAccommodationParams>({
      featured: [],
      convenient: [],
      properties: "",
    });

  const filters = useMemo(() => filtersProps, []);

  const selectedFilterHandler = (
    item: string,
    type: string,
    check: boolean
  ) => {
    const _type = type as keyof FilterAccommodationParams;
    if (check) {
      setSelectedFilter((prev) => {
        const updatedFilters = { ...prev };
        if (updatedFilters[_type]) {
          if (type === "properties") {
            updatedFilters[type] = item;
          } else {
            (
              updatedFilters[
                type as keyof FilterAccommodationParams
              ] as string[]
            ).push(item);
          }
        } else {
          (updatedFilters[_type] as string[]) = [item];
        }
        return updatedFilters;
      });
    } else {
      setSelectedFilter((prev) => {
        const updatedFilters = { ...prev };
        if (type === "properties") {
          updatedFilters[type] = "";
        } else {
          (updatedFilters[_type] as string[]) = (
            updatedFilters[_type] as string[]
          ).filter((i: string) => i !== item);
        }
        return updatedFilters;
      });
    }
  };

  useEffect(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      ...(selectedFilter.featured.length > 0
        ? { featured: selectedFilter.featured }
        : {}),
      ...(selectedFilter.convenient.length > 0
        ? { convenient: selectedFilter.convenient }
        : {}),
      ...(selectedFilter.properties
        ? { properties: selectedFilter.properties }
        : {}),
      page: 1,
      pageSize: 8,
    };
    if (!selectedFilter.featured.length) delete updatedQuery["featured"];
    if (!selectedFilter.convenient.length) delete updatedQuery["convenient"];
    if (!selectedFilter.properties) delete updatedQuery["properties"];
    setResetPageInfo(true);
    const url = qs.stringifyUrl(
      {
        url: "/search-accomodation",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [selectedFilter]);

  const searchAcommodationList = useMemo(
    () => (
      <SearchAcommodationList
        resetPage={resetPageInfo}
        setResetPageInfo={setResetPageInfo}
        accommodationsProps={accommodationsProps}
        currentUser={currentUser}
      />
    ),
    [resetPageInfo, accommodationsProps, currentUser]
  );
  return (
    <Container>
      <div className="mb-4">
        <SearchFilter
          setResetPageInfo={setResetPageInfo}
          filtersProps={filtersProps}
          searchParams={searchParams}
        />
      </div>
      <div className="flex gap-6 mt-5">
        <div className="w-[15%]">
          <div className="sticky top-30">
            <SearchAccomodationFilter
              onSelectedFilter={selectedFilterHandler}
              data={filters}
            />
          </div>
        </div>
        <div className="w-[80%]">
          <div
            className="mt-4
            grid
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-4
            gap-8"
          >
            {searchAcommodationList}
          </div>
        </div>
      </div>
    </Container>
  );
}

"use client";
import React from "react";
import MenuItem from "../components/navbar/MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
type Props = {};

export default function NavHistory({}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const query = queryString.parse(params?.toString() || "");
  const tabLinks = [
    { label: "Current reservations", tab: "current" },
    { label: "Reservations history", tab: "history" },
    { label: "My favorites", tab: "favorites" },
  ];
  return (
    <div className="flex gap-5">
      {tabLinks.map((tab) => {
        return (
          <MenuItem
            key={tab.tab}
            className={`border rounded-full cursor-pointer ${
              query.tab === tab.tab ? "border-stone-900" : ""
            }`}
            label={tab.label}
            onClick={() => router.push(`/host?tab=${tab.tab}`)}
          />
        );
      })}
    </div>
  );
}

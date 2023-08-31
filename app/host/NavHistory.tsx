"use client";
import React, { useEffect, useState } from "react";
import MenuItem from "../components/navbar/MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
type Props = {
  onClick: (data: string) => void;
  current: string;
  isHost?: boolean;
};

export default function NavHistory({ onClick, current, isHost }: Props) {
  const router = useRouter();

  const tabLinks = [
    ...(isHost ? [{ label: "My Room", tab: "host" }] : []),
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
              current === tab.tab ? "border-stone-900" : ""
            }`}
            label={tab.label}
            onClick={() => {
              onClick(tab.tab);
            }}
          />
        );
      })}
    </div>
  );
}

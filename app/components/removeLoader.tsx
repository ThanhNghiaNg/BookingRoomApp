"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const RemoveLoader = () => {
  const loader = document.getElementById("loader");
  const pathname = usePathname();

  // Check if the current route is a nested route

  useEffect(() => {
    window.onload = () => {
      loader?.setAttribute("style", "display: none");
    };
  }, [pathname, loader]);

  return <></>;
};

export default RemoveLoader;

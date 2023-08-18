"use client";

import Loader from "@/app/components/Loader";
import { usePathname, useRouter } from "next/navigation";

const Loading = () => {
  const pathname = usePathname();

  // Check if the current route is a nested route
  const isNestedRoute = pathname!.split("/").length > 3;

  if (isNestedRoute) {
    return null;
  }

  return <Loader />;
};

export default Loading;

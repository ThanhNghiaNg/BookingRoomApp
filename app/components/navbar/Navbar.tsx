"use client";

import { SafeUser } from "@/app/types";
import Image from "next/image";

import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed w-full bg-white z-20 shadow-sm">
      <div
        className="
          py-4
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Image
              onClick={() => router.push("/")}
              className="hidden md:block cursor-pointer"
              src="/images/logo.png"
              height="80"
              width="80"
              alt="Logo"
            />
            {/* <Search /> */}
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

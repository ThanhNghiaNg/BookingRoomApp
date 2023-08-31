"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  useUser,
  UserButton,
} from "@clerk/nextjs";

import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import { toast } from "react-hot-toast";
import axios from "axios";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = () => {
  const router = useRouter();

  const { user: currentUser } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const onRent = useCallback(() => {
    if (!currentUser) return;
    window.open("/createroom/about", "_blank");
  }, [currentUser]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (currentUser != null) {
      axios
        .post(`/api/register-clerk-user`, {
          email: currentUser?.emailAddresses[0].emailAddress,
          imageUrl: currentUser?.imageUrl,
          userClerkId: currentUser?.id,
        })
        .then(() => {
          toast.success("Welcome!");
        });
    }
  }, [currentUser]);

  const handleItemClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };
  const menuItems = currentUser ? (
    <>
      <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <button
          className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold"
          onClick={() => handleItemClick("/user-profile")}
        >
          My Profile
        </button>
        <button
          className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold"
          onClick={() => handleItemClick("/host?tab=favorites")}
        >
          Favorite room
        </button>
        <button
          onClick={() => handleItemClick("/host?tab=current")}
          className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold"
        >
          Booking History
        </button>
        <button
          className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold"
          onClick={() => handleItemClick("/properties")}
        >
          Manage Properties
        </button>
        <button
          onClick={onRent}
          className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold"
        >
          Host your home
        </button>
        <hr className="my-1" />

        <SignOutButton
          signOutCallback={() => {
            toast.success("Logged Out!");
          }}
        >
          <button className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            Logout
          </button>
        </SignOutButton>
      </div>
    </>
  ) : (
    <>
      <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <SignInButton mode="modal">
          <button className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            Login
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="dropdown-item px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            Sign up
          </button>
        </SignUpButton>
      </div>
    </>
  );
  const btnHostHome = (
    <div
      onClick={onRent}
      className="
      hidden
      lg:block
      text-sm
      font-semibold
      py-3
      px-4
      rounded-full
      hover:bg-neutral-100
      transition
      cursor-pointer
    "
    >
      Host your home
    </div>
  );
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 justify-end">
        {currentUser ? (
          btnHostHome
        ) : (
          <SignInButton mode="modal">{btnHostHome}</SignInButton>
        )}
        <div
          ref={dropdownRef}
          className="dropdown dropdown-end inline-block relative"
        >
          <button
            className="p-4 md:p-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition
                      "
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex px-2 items-center gap-3 ">
              <AiOutlineMenu size={15} />
              <div className="hidden md:block">
                <Avatar src={currentUser?.imageUrl} />
              </div>
            </div>
          </button>
          {isOpen && <div className="dropdown-menu">{menuItems}</div>}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

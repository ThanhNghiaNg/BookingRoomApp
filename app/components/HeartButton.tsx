"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import classNames from "classnames";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { SignInButton, SignedIn } from "@clerk/nextjs";

interface HeartButtonProps {
  accommodationId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  accommodationId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    accommodationId,
    currentUser,
  });

  const heartClasses = classNames(
    "w-8 h-8",
    hasFavorited ? "text-rose-500" : "text-neutral-500/70"
  );

  const heartButton = (
    <div>
      <AiOutlineHeart
        size={35}
        className="
    fill-white
    absolute
    -top-[2px]
    -right-[2px]
  "
      />
      <AiFillHeart className={heartClasses} />
    </div>
  );

  return (
    <>
      <div
        className="
          relative
          hover:opacity-80
          transition
          cursor-pointer
          "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!currentUser && (
          <SignInButton mode="modal">{heartButton}</SignInButton>
        )}
        <SignedIn>
          <div onClick={toggleFavorite}>{heartButton}</div>
        </SignedIn>
      </div>
    </>
  );
};

export default HeartButton;

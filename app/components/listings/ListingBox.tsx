import { useState } from "react";
import { IconType } from "react-icons";

interface ListingBoxProps {
  icon: IconType;
  label: string;
}

export const ListingBox: React.FC<ListingBoxProps> = ({
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`
        w-48
        h-24
        rounded-xl
        border-2
        py-6
        px-4
        flex
        flex-row
        gap-3
        transition
        cursor-pointer
        border-neutral-200
        items-center
        justify-center
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

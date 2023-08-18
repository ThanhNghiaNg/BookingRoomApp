import { useState } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick: (label: string, selected: boolean) => void;
}

export const CategoryBoxMulti: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  const handleClick = () => {
    onClick(label, !selected);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

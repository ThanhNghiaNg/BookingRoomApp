"use client";
import { ChangeEvent, useState } from "react";

interface ListingReviewProps {
  isDisable?: boolean;
  label: string;
  valueProps: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ListingRange: React.FC<ListingReviewProps> = ({
  isDisable = false,
  label,
  valueProps = 0,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="font-bold">{label}</span>
        <div className="flex justify-center">
          <span className="font-bold align-top">{valueProps}</span>
          <span className="flex items-end">/5</span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        disabled={isDisable}
        max="5"
        value={valueProps}
        className="range range-success range-xs"
        step={0.5}
        onChange={onChange}
      />
    </div>
  );
};

export default ListingRange;

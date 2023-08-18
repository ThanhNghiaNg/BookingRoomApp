"use client";
import { Rate } from "antd";

interface ListingRateProps {
  disabled: boolean;
  value: number;
}

const ListingRate: React.FC<ListingRateProps> = ({ disabled, value }) => {
  return (
    <div className="flex flex-col items-center justify-center col-span-1">
      <div className="flex justify-center">
        <span className="text-4xl font-bold align-top">{value}</span>
        <span className="flex items-end text-2xl">/5</span>
      </div>
      <Rate disabled={disabled} allowHalf value={value} />
    </div>
  );
};

export default ListingRate;

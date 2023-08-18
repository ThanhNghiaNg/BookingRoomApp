"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { SafeAccommodation, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import ListingHead from "../listings/ListingHead";
import Heading from "../Heading";

interface SearchAccomodationCardProps {
  data: SafeAccommodation;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const SeachAccomodationCard: React.FC<SearchAccomodationCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  return (
    <div
      onClick={() => router.push(`/accommodation/${data.id}`)}
      className="stats shadow cursor-pointer hover:shadow-md transition lg:stats-horizontal "
    >
      <div className="grid grid-cols-4 gap-5">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
            col-span-1
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.image}
            alt={`${data.title}`}
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton accommodationId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="col-span-3 py-1">
          <div className="flex flex-col justify-between w-full h-full">
            <div>
              <Heading title={data.title} />
              <div className="font-semibold text-lg">{data.area}</div>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {data.featured.map((feat) => (
                <div key={feat} className="badge badge-outline font-light">
                  {feat}
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {data.convenient.map((convenient) => (
                <div
                  key={convenient}
                  className="badge badge-secondary font-light"
                >
                  {convenient}
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">$ {`${data.pricesPerDate}`}</div>
              {!reservation && <div className="font-light">per night</div>}
            </div>
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SeachAccomodationCard;

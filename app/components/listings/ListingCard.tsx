"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import {
  SafeAccommodation,
  SafeListing,
  SafeReservation,
  SafeUser,
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { Tooltip } from "antd";

interface ListingCardProps {
  data: SafeAccommodation;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  onEdit?: (id: string) => void;
  onClickCard?: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  onEdit,
  onClickCard,
}) => {
  const router = useRouter();

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

  const handlerEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onEdit?.(actionId);
    },
    [disabled, onEdit, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.pricesPerDate;
  }, [reservation, data?.pricesPerDate]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={
        onClickCard
          ? onClickCard
          : () => {
              router.push(`/accommodation/${data?.id}`);
            }
      }
      className="card bg-base-100 col-span-1 cursor-pointer group shadow-xl max-h-[550px]"
    >
      <div className="flex flex-col gap-2 w-full">
        <figure>
          <div
            className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
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
              src={data?.image}
              alt="Listing"
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw, 33vw"
            />
            <div
              className="
            absolute
            top-3
            right-3
          "
            >
              <HeartButton
                accommodationId={data?.id}
                currentUser={currentUser}
              />
            </div>
          </div>
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            <Tooltip
              placement="bottom"
              title={`${data?.address}, ${data?.area}`}
            >
              <div className="font-semibold text-lg truncate">
                {data?.address}, {data?.area}
              </div>
            </Tooltip>
          </h2>
          <div className="flex flex-col gap-3">
            <div className="badge badge-ghost font-light text-neutral-500">
              {reservationDate || data.properties}
            </div>
            <div className="card-actions">
              {data?.convenient
                ?.slice(0, 3)
                ?.map((element: any, index: number) => (
                  <div
                    key={index}
                    className="badge badge-secondary badge-outline font-light text-neutral-500"
                  >
                    {element}
                  </div>
                ))}
            </div>
          </div>

          <div className="card-actions justify-end">
            <div className="font-semibold">$ {price}</div>
            {!reservation && <div className="font-light">/ đêm</div>}
          </div>
          {onAction && actionLabel && (
            <div className="flex justify-between">
              <div>
                <Button
                  disabled={disabled}
                  small
                  label={actionLabel}
                  onClick={handleCancel}
                />
              </div>
              <div>
                <Button
                  disabled={disabled}
                  small
                  outline
                  label={"Edit Room"}
                  onClick={handlerEdit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

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
  onAction?: (id: string, index?: number) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  onEdit?: (id: string) => void;
  onClickCard?: () => void;
  textColor?: string;
  index?: number;
  editMode?: boolean;
  editPosition?: "price" | "bottom";
  actionPosition?: "price" | "bottom";
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
  textColor,
  index,
  editMode = true,
  editPosition = "bottom",
  actionPosition = "bottom",
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId, index);
    },
    [disabled, onAction, actionId, index]
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
      className="card shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-base-100 col-span-1 cursor-pointer group h-[550px] my-4 mx-2"
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
          <h2 className="card-title h-[56px]">
            <Tooltip
              placement="bottom"
              title={`${data?.address}, ${data?.area}`}
            >
              <div
                className={"font-semibold text-lg truncate" + textColor || ""}
              >
                {data?.address}, {data?.area}
              </div>
            </Tooltip>
          </h2>
          <div className="flex flex-col gap-3">
            <div className={"badge badge-ghost font-light text-neutral-500"}>
              {reservationDate || data.properties}
            </div>
            <div className="card-actions h-[48px]">
              {data?.convenient
                ?.slice(0, 3)
                ?.map((element: any, index: number) => (
                  <div
                    key={index}
                    className={
                      "badge badge-secondary badge-outline font-ligh text-neutral-500"
                    }
                  >
                    {element}
                  </div>
                ))}
            </div>
          </div>

          <div
            className={
              "card-actions " +
              ((editMode && editPosition === "price") ||
              (onAction && actionLabel && actionPosition === "price")
                ? "justify-between"
                : "justify-end")
            }
          >
            {onAction && actionLabel && actionPosition === "price" && (
              <div>
                <Button
                  disabled={disabled}
                  small
                  label={actionLabel}
                  onClick={handleCancel}
                />
              </div>
            )}

            {editMode && editPosition === "price" && (
              <div>
                <Button
                  disabled={disabled}
                  small
                  outline
                  label={"Edit Room"}
                  onClick={handlerEdit}
                  color="#fb06a4"
                />
              </div>
            )}
            <div className={"font-semibold" + textColor || ""}>$ {price}</div>
            {!reservation && <div className="font-light">/ night</div>}
          </div>
          {(onAction || actionLabel || editMode) && (
            <div
              className={
                "flex w-full gap-2" +
                (onAction && actionLabel && editMode
                  ? " justify-between"
                  : " justify-end")
              }
            >
              {onAction && actionLabel && actionPosition === "bottom" && (
                <div>
                  <Button
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick={handleCancel}
                  />
                </div>
              )}
              {editMode && editPosition === "bottom" && (
                <div>
                  <Button
                    disabled={disabled}
                    small
                    outline
                    label={"Edit Room"}
                    onClick={handlerEdit}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

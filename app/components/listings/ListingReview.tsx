"use client";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import ListingRange from "./ListingRange";
import ListingRate from "./ListingRate";
import { SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { ResType, ReviewType } from "@/app/actions/getReviewByAccId";
import { useRouter } from "next/navigation";

interface Props {
  currentUser?: SafeUser | null;
  accommodationId: string;
  reservation: SafeReservation[];
  reviewByAccId: ResType;
  reviewByUserId: ReviewType | null;
}

const roundHalf = (num: number) => {
  return (Math.round(num * 2) / 2) as number;
};

const ListingReview = ({
  currentUser,
  accommodationId,
  reservation,
  reviewByAccId,
  reviewByUserId,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hygienic, setHygienic] = useState<number>(
    reviewByUserId ? reviewByUserId.hygienic : 0
  );
  const [location, setLocation] = useState<number>(
    reviewByUserId ? reviewByUserId.location : 0
  );
  const [price, setPrice] = useState<number>(
    reviewByUserId ? reviewByUserId.price : 0
  );
  const [quality, setQuality] = useState<number>(
    reviewByUserId ? reviewByUserId.quality : 0
  );
  const [rooms, setRooms] = useState<number>(
    reviewByUserId ? reviewByUserId.rooms : 0
  );
  const [establishments, setEstablishments] = useState<number>(
    reviewByUserId ? reviewByUserId.establishments : 0
  );
  const [isFirstTab, setIsFirstTab] = useState<boolean>(true);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const router = useRouter();

  const today = useMemo(
    () =>
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
    []
  );

  const setInitValue = () => {
    setHygienic(0);
    setLocation(0);
    setPrice(0);
    setRooms(0);
    setEstablishments(0);
    setQuality(0);
  };

  const rating: number = useMemo(
    () =>
      roundHalf(
        (establishments + hygienic + location + price + quality + rooms) / 6
      ),
    [establishments, hygienic, location, price, quality, rooms]
  );

  const onCreateReview = useCallback(async () => {
    setIsLoading(true);
    axios
      .post("/api/review-accommodation", {
        accommodationId,
        userId: currentUser?.id,
        hygienic,
        location,
        price,
        quality,
        rooms,
        establishments,
        rating,
      })
      .then(() => {
        toast.success("Save review successfully!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    accommodationId,
    currentUser?.id,
    hygienic,
    location,
    price,
    quality,
    rooms,
    establishments,
    rating,
    router,
  ]);

  const onRemoveReview = useCallback(async () => {
    setIsLoading(true);
    axios
      .delete(`/api/review-accommodation/${reviewByUserId?.id}`)
      .then(() => {
        toast.success("Remove review successfully!!");
        setInitValue();
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reviewByUserId?.id, router]);

  useEffect(() => {
    reservation.some(
      (item) =>
        item.userId === currentUser?.id && new Date(item.startDate) <= today
    ) && setIsBooked(true);
  }, [currentUser?.id, reservation, today]);

  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row items-center gap-2 mb-8 tabs">
        <a
          className={`tab tab-bordered text-xl font-semibold ${
            isFirstTab && `tab-active`
          }`}
          onClick={() => {
            setIsFirstTab(true);
          }}
        >
          Review
        </a>
        <a
          className={`tab tab-bordered text-xl font-semibold ${
            !isFirstTab && `tab-active`
          }`}
          onClick={() => {
            setIsFirstTab(false);
          }}
        >
          Your Rating
        </a>
      </div>
      <div
        className={`grid grid-cols-3 gap-2 justify-between items-center ${
          !isFirstTab && `hidden`
        }`}
      >
        <div className="flex flex-col items-center col-span-1 scale-150">
          <ListingRate disabled={true} value={reviewByAccId.rating} />
          <span className="text-center">{`${reviewByAccId.count} review${
            Number(reviewByAccId?.count) < 2 ? "" : "s"
          }`}</span>
        </div>
        <div className="grid grid-cols-2 col-span-2 gap-8">
          <div className="flex flex-col gap-4">
            <ListingRange
              label="Price"
              valueProps={reviewByAccId.price}
              isDisable={true}
            />
            <ListingRange
              label="Location"
              valueProps={reviewByAccId.location}
              isDisable={true}
            />
            <ListingRange
              label="Hygienic"
              valueProps={reviewByAccId.hygienic}
              isDisable={true}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ListingRange
              label="Rooms"
              valueProps={reviewByAccId.rooms}
              isDisable={true}
            />
            <ListingRange
              label="Quality"
              valueProps={reviewByAccId.quality}
              isDisable={true}
            />
            <ListingRange
              label="Establishments"
              valueProps={reviewByAccId.establishments}
              isDisable={true}
            />
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-3 gap-2 justify-between items-center ${
          isFirstTab && `hidden`
        }`}
      >
        {isBooked ? (
          <>
            <div className="flex flex-col items-center col-span-1 scale-150">
              <ListingRate disabled={true} value={rating} />
            </div>
            <div className="grid grid-cols-2 col-span-2 gap-8">
              <div className="flex flex-col gap-4">
                <ListingRange
                  label="Price"
                  valueProps={price}
                  isDisable={isLoading || !!reviewByUserId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPrice(Number(e.target.value));
                  }}
                />
                <ListingRange
                  label="Location"
                  valueProps={location}
                  isDisable={isLoading || !!reviewByUserId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setLocation(Number(e.target.value));
                  }}
                />
                <ListingRange
                  label="Hygienic"
                  valueProps={hygienic}
                  isDisable={isLoading || !!reviewByUserId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setHygienic(Number(e.target.value));
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <ListingRange
                  label="Rooms"
                  valueProps={rooms}
                  isDisable={isLoading || !!reviewByUserId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setRooms(Number(e.target.value));
                  }}
                />
                <ListingRange
                  label="Quality"
                  valueProps={quality}
                  isDisable={isLoading || !!reviewByUserId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setQuality(Number(e.target.value));
                  }}
                />
                <ListingRange
                  label="Establishments"
                  valueProps={establishments}
                  isDisable={isLoading || !!reviewByUserId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEstablishments(Number(e.target.value));
                  }}
                />
              </div>
              <Button
                label="Review"
                onClick={onCreateReview}
                disabled={isLoading || !!reviewByUserId}
              />
              <Button
                label="Remove"
                onClick={onRemoveReview}
                outline={true}
                disabled={isLoading || !reviewByUserId}
              />
            </div>
          </>
        ) : (
          "Please make a reservation for a review"
        )}
      </div>
    </div>
  );
};

export default ListingReview;

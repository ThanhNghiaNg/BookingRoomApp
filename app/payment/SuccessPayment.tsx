"use client";
import axios from "axios";
import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import EmptyState from "@/app/components/EmptyState";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = { searchParams: any };

export default function SuccessPayment({ searchParams }: Props) {
  const { user: currentUser } = useUser();
  const router = useRouter();
  const {
    totalPrice,
    startDate,
    endDate,
    accommodationId,
    email,
    name,
    phone,
    status,
  } = searchParams;

  // return <EmptyState title="OK" />;
  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return <EmptyState title="User do not logged in!" />;
    }
    // setIsLoading(true);

    // axios
    //   .post("/api/reservations", {
    //     totalPrice,
    //     startDate,
    //     endDate,
    //     accommodationId,
    //     email,
    //     name,
    //     phone,
    //     status,
    //   })
    //   .then(() => {
    //     toast.success("Listing reserved!");
    //     router.push("/host?tab=current");
    //   })
    //   .catch(() => {
    //     toast.error("Something went wrong.");
    //   })
    //   .finally(() => {
    //     // setIsLoading(false);
    //   });
  }, [searchParams, currentUser]);

  onCreateReservation();

  console.log(searchParams.status);

  if (searchParams.status === "cancel") {
    return <EmptyState title="User do not allow" />;
  }

  return (
    <div className="bg-white h-[100%] flex justify-center w-full">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a nice travel trip! </p>
          <div className="py-10 text-center">
            <button
              onClick={() => router.push("/host?tab=current")}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              CHECK CHECK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

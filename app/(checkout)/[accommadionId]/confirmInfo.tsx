"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import { SafeReservation, SafeUser } from "../../types";
import CalendarZone from "./calendar";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import {
  createNewNotification,
  pushNotification,
} from "@/app/components/Notification/pushNotification";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: SafeUser | null;
  id: string;
  price: number;
  reservations: SafeReservation[] | any;
  date: {
    startDate: Date;
    endDate: Date;
  };
  imageAccommodationUrl?: string;
  accommodationTitle?: string;
  hostRoom?: string;
}

interface Plan {
  name: string;
  option: string;
  descrip: string;
}

const ConfirmInfo: React.FC<Props> = ({
  currentUser,
  id,
  price,
  reservations,
  date,
  imageAccommodationUrl,
  accommodationTitle,
  hostRoom,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      email: currentUser?.email,
      name: currentUser?.name,
      phone: "",
      startDate: date.startDate,
      endDate: date.endDate,
      totalPrice: price,
      id: id,
      paymentOption: "COD",
    },
  });

  const email = watch("email");
  const name = watch("name");
  const phone = watch("phone");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const totalPrice = watch("totalPrice");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onChangePayment = (payment: Plan) => {
    setCustomValue("paymentOption", payment.option);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log({ ...data, imageUrl: imageAccommodationUrl}); // Dữ liệu từ form ConfirmInfo
    if (data.paymentOption !== "COD") {
      const session = await axios.post("/api/create-stripe-session", {
        ...data,
        imageUrl: imageAccommodationUrl,
        title: accommodationTitle,
      });

      // Add an api to save reservation to database with status is pending
      // add a field sessionId to reservation
      const reservation = await axios.post("/api/reservations", {
        totalPrice,
        startDate,
        endDate,
        stripeSessionId: session.data.sessionId,
        accommodationId: data.id,
        email,
        name,
        phone,
        status: "pending",
      });

      if (!reservation) return toast.error("Something went wrong!");

      const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
      );

      const stripe = await stripePromise;

      const result = await stripe?.redirectToCheckout({
        sessionId: session.data.sessionId,
      });

      const notificationData = {
        content: "You have a new reservation!",
        userId: hostRoom,
        parnerID: currentUser?.id,
        parnerAvatar: currentUser?.image || undefined,
      };

      await pushNotification(notificationData);

      await createNewNotification({
        data: [
          "You have a new reservation!",
          hostRoom || "",
          "text",
          currentUser?.id || "",
          currentUser?.image || "",
        ],
      });

      if (result?.error) {
        toast.error(result.error.message || "");
      }
    } else {
      const reservation = await axios
        .post("/api/reservations", {
          totalPrice,
          startDate,
          endDate,
          stripeSessionId: "",
          accommodationId: data.id,
          email,
          name,
          phone,
          status: "COD",
        })
        .then((res) => {
          if (!!res) {
            const notificationData = {
              content: "You have a new reservation!",
              userId: hostRoom,
              parnerID: currentUser?.id,
              parnerAvatar: currentUser?.image || undefined,
            };

            pushNotification(notificationData);

            createNewNotification({
              data: [
                "You have a new reservation!",
                hostRoom || "",
                "Success",
                currentUser?.id || "",
                currentUser?.image || "",
              ],
            });
          }
        })
        .then(() => [router.push("/host?tab=current")]);

      if (!reservation) {
        toast.error("Something Went Wrong!");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="flex flex-row justify-between gap-12">
            <Input
              register={register}
              id="name"
              label="Name"
              disabled={isLoading}
              errors={errors}
              rules={{ required: "Name is required" }}
            />
            <Input
              register={register}
              id="phone"
              label="Phone"
              disabled={isLoading}
              errors={errors}
              rules={{
                required: "Phone is required",
                pattern: {
                  value: /[0-9]{10,11}/,
                  message: "Invalid phone number",
                },
              }}
            />
          </div>

          <Input
            register={register}
            id="email"
            label="Email"
            disabled={isLoading}
            errors={errors}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
        </div>
      </form>

      <div className="pt-8">
        <CalendarZone
          id={id}
          price={price}
          currentUser={currentUser}
          reservations={reservations}
          date={date}
          onSubmit={handleSubmit(onSubmit) as SubmitHandler<FieldValues>}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onDateChange={(startDate, endDate) => {
            setCustomValue("startDate", startDate);
            setCustomValue("endDate", endDate);
          }}
          onTotalPriceChange={(totalPrice) => {
            setCustomValue("totalPrice", totalPrice);
          }}
          onChangePayment={onChangePayment}
        />
      </div>
    </>
  );
};

export default ConfirmInfo;

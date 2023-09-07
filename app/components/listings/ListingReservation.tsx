"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeReservation, SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ClientOnly from "../ClientOnly";
import nodemailer from "nodemailer";
import { sendMail } from "../../libs/mailService";
import useConfirmModal from "../../hooks/useConfrimModal";
import { SignInButton, SignedIn } from "@clerk/nextjs";
import queryString from "query-string";
import { getURL } from "next/dist/shared/lib/utils";

const theme = createTheme({
  palette: {
    primary: {
      main: "#262626",
    },
  },
});

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingReservationProps {
  id: string;
  price: number;
  currentUser?: SafeUser | null;
  reservations: SafeReservation[] | any;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  id,
  price,
  currentUser,
  reservations,
}) => {
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  const [totalPrice, setTotalPrice] = useState(price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const router = useRouter();

  const today = useMemo(() => new Date(), []);

  const todayJs = useMemo(() => dayjs(today.toString()), [today]);

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs>(todayJs);
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs>(todayJs);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const handleFocus = () => {
    setOpen(true);
    setFocus(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFocus(false);
  };

  const confirmModal = useConfirmModal();

  const handleOpenModal = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      console.log("Start Date or End Date is empty!");
      return;
    }

    const dataParams = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      totalPrice: totalPrice,
      accommodationId: id,
    };

    console.log(dataParams);

    confirmModal.onOpen(dataParams);
  };

  // const onCreateReservation = useCallback(async () => {
  //   if (!currentUser) {
  //     return loginModal.onOpen();
  //   }
  //   setIsLoading(true);

  //   axios
  //     .post("/api/reservations", {
  //       totalPrice,
  //       startDate: dateRange.startDate,
  //       endDate: dateRange.endDate,
  //       accommodationId: id,
  //     })
  //     .then(() => {
  //       toast.success("Listing reserved!");
  //       setDateRange(initialDateRange);
  //       router.push("/host?tab=current");
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong.");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [totalPrice, dateRange, id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && price) {
        setTotalPrice((dayCount + 1) * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange, price]);

  useEffect(() => {
    setDateRange((prev) => {
      return {
        ...prev,
        startDate: dateCheckIn.toDate(),
        endDate: dateCheckOut.toDate(),
      };
    });
    if (dateCheckIn > dateCheckOut) setDateCheckOut(dateCheckIn);

    const todayCompare = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    disabledDates.some(
      (item) => item.toDateString() === dateCheckIn.toDate().toDateString()
    )
      ? setIsLoading(true)
      : setIsLoading(false);

    if (
      new Date(
        dateCheckIn.toDate().getFullYear(),
        dateCheckIn.toDate().getMonth(),
        dateCheckIn.toDate().getDate()
      ) < todayCompare ||
      new Date(
        dateCheckOut.toDate().getFullYear(),
        dateCheckOut.toDate().getMonth(),
        dateCheckOut.toDate().getDate()
      ) < todayCompare
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [dateCheckIn, dateCheckOut, today, disabledDates]);
  console.log({ currentUser });
  return (
    <div
      className="
      sticky
      top-24
      bg-white
        rounded-xl
        border-[1px]
      border-neutral-200
        shadow-2xl
      "
    >
      <div className="flex flex-row items-center gap-1 p-4 ">
        <div className="z-10 text-2xl font-semibold">$ {price}</div>
        <div className="z-10 font-light text-neutral-600"> / night</div>
      </div>
      <div onFocus={handleFocus} className="flex flex-col items-end">
        <hr className="z-10 w-full" />
        <div className="z-10 flex items-center justify-between mx-3 my-6">
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                format="DD/MM/YYYY"
                label="Nhận phòng"
                value={dateCheckIn}
                maxDate={dateCheckOut}
                focused={focus}
                color="primary"
                disablePast
                className="focus:border-black focus:border-2"
                onChange={(value) => {
                  value && setDateCheckIn(value);
                }}
              />
              <span className="mx-3 text-4xl">-</span>
              <DateField
                format="DD/MM/YYYY"
                label="Trả phòng"
                focused={focus}
                value={dateCheckOut}
                minDate={dateCheckIn}
                onChange={(value) => {
                  value && setDateCheckOut(value);
                }}
                color="primary"
                disablePast
                className="focus:border-black focus:border-2"
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
        <div className="absolute top-0">
          <Calendar
            onClick={
              error
                ? () => {
                    toast.error("Vui lòng chọn ngày phù hợp!");
                  }
                : handleClose
            }
            // disabled={isLoading}
            isOpen={open}
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => {
              setDateRange(value.selection);
              setDateCheckIn(dayjs(value.selection.startDate));
              setDateCheckOut(dayjs(value.selection.endDate));
            }}
          />
        </div>
      </div>
      <hr />

      <div className={`p-4 ${open && "hidden"}`}>
        {!currentUser && (
          <SignInButton mode="modal">
            <Button disabled={isLoading} label="Đặt phòng" />
          </SignInButton>
        )}
        <SignedIn>
          <Button
            disabled={isLoading}
            label="Đặt phòng"
            onClick={handleOpenModal}
          />
        </SignedIn>
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold ">
        <div>Tổng tiền</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;

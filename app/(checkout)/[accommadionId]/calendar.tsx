"use client";

import { Range } from "react-date-range";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import nodemailer from "nodemailer";
import { sendMail } from "../../libs/mailService";
import useConfirmModal from "../../hooks/useConfrimModal";
import Button from "../../components/Button";
import Calendar from "../../components/inputs/Calendar";
import PaymentOption from "./paymentOption";
import { FieldValues, SubmitHandler } from "react-hook-form";

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

const plans: Plan[] = [
  {
    id: 0,
    name: "Pay upon room receipt",
    option: "COD",
    descrip:
      "Pay cash upon room receipt, rooms may run out or confirm later due to host's unforeseen reasons",
  },
  {
    id: 1,
    name: "Pay immediately",
    option: "ONLINE",
    descrip:
      "Pay now through our gateway, host will confirm with you within 24 hours",
  },
];
interface ListingReservationProps {
  id: string;
  price: number;
  currentUser?: SafeUser | null;
  reservations: SafeReservation[] | any;
  date: {
    startDate: Date;
    endDate: Date;
  };
  onSubmit: SubmitHandler<FieldValues>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  onDateChange: (startDate: Date, endDate: Date) => void;
  onTotalPriceChange: (totalPrice: number) => void;
  onChangePayment: (selectedPlan: Plan) => void;
}
interface Plan {
  id: string | number;
  name: string;
  option: string;
  descrip: string;
}

const CalendarZone: React.FC<ListingReservationProps> = ({
  id,
  price,
  currentUser,
  reservations,
  date,
  onSubmit,
  isLoading,
  setIsLoading,
  onDateChange,
  onTotalPriceChange,
  onChangePayment,
}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  const [totalPrice, setTotalPrice] = useState(price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const router = useRouter();

  const today = useMemo(() => new Date(), []);

  const todayJs = useMemo(() => dayjs(today.toString()), [today]);

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs>(
    dayjs(date.startDate).startOf("day")
  );
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs>(
    dayjs(date.endDate).startOf("day")
  );

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    if (!reservations) {
      return dates;
    }

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

  const handlePlanChange = (selectedPlan: Plan) => {
    setSelectedPlan(selectedPlan);
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
        const totalPrice = (dayCount + 1) * price;
        setTotalPrice(totalPrice);
        onTotalPriceChange(totalPrice);
      } else {
        setTotalPrice(price);
        onTotalPriceChange(price);
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

    onDateChange(dateCheckIn.toDate(), dateCheckOut.toDate());

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
  }, [dateCheckIn, dateCheckOut, today, disabledDates, setIsLoading, ,]);

  return (
    <div
      className="
      sticky
      top-24
      "
    >
      <div onFocus={handleFocus} className="flex flex-col items-center">
        <div className="z-20 flex items-center justify-between mx-3 my-6">
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
        <div className="absolute top-0 z-10">
          <Calendar
            onClick={
              error
                ? () => {
                    toast.error("Vui lòng chọn ngày phù hợp!");
                  }
                : handleClose
            }
            disabled={isLoading}
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

      <hr />
      <div className="flex flex-col items-end justify-end p-4 text-lg font-semibold z-0">
        <div className="flex flex-col justify-end  w-[40%]">
          <div className="flex flex-row items-center gap-1 p-4 justify-between">
            <div>Price Per Day: </div>
            <div className="z-10 font-light text-neutral-600 ">${price}</div>
          </div>
          <div className="flex flex-row items-center gap-1 p-4 justify-between">
            <div>Total Price: </div>
            <div className="z-10 font-light text-neutral-600">
              ${totalPrice}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <PaymentOption plans={plans} onChange={onChangePayment} />
      </div>
      <div className={`p-4 ${open && "hidden"}`}>
        <Button disabled={isLoading} label="Đặt phòng" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default CalendarZone;

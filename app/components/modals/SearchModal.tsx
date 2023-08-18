"use client";
import qs from "query-string";
import dynamic from "next/dynamic";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Input from "../inputs/Input";

enum STEPS {
  PLAN = 0,
  INFO = 1,
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#262626",
    },
  },
});

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { user: currentUser } = useUser();

  const [step, setStep] = useState(STEPS.PLAN);

  const [location, setLocation] = useState<string>("");
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const today = useMemo(() => new Date(), []);

  const todayJs = useMemo(() => dayjs(today.toString()), [today]);

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs>(todayJs);
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs>(todayJs);

  const {
    register,
    handleSubmit,
    formState: { errors }, // TODO: update errore mess, docs: https://www.react-hook-form.com/api/useform/formstate/
  } = useForm<FieldValues>({
    defaultValues: {
      location,
    },
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    []
  );

  const handleFocus = () => {
    setOpen(true);
    setFocus(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFocus(false);
  };

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      if (step !== STEPS.INFO) {
        return onNext();
      }

      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        // TODO: update type
        ...currentQuery,
        locationValue: data.location,
        guestCount,
        roomCount,
        bathroomCount,
      };

      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }

      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      updatedQuery.page = 1;
      updatedQuery.pageSize = 8;

      const url = qs.stringifyUrl(
        {
          url: "/search-accomodation",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      setStep(STEPS.PLAN);
      searchModal.onClose();

      Promise.all([
        () => {
          if (!currentUser) return;
          axios.post(`/api/search-accommodation`, {
            location,
          });
        },
      ]).then(() => {
        router.push(url);
      });
    },
    [
      step,
      params,
      guestCount,
      roomCount,
      bathroomCount,
      dateRange.startDate,
      dateRange.endDate,
      searchModal,
      location,
      onNext,
      router,
    ]
  );

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PLAN) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent;

  if (step === STEPS.PLAN) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you wanna go?"
            subtitle="Find the perfect location!"
          />
          <Input
            id="location"
            label="Anywhere"
            register={register}
            errors={errors}
            required
            // onChange={(e) => { // ! haha sai ở đây nha
            //   const value = e.target.value;
            //   if (!!value) {
            //     setError("location", {
            //       message: "You have to type the location!",
            //     });
            //   }
            // }}
          />
          <hr />
        </div>
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            subtitle="Make sure everyone is free!"
          />

          <div onFocus={handleFocus} className="flex flex-col items-end">
            <hr className="z-15 w-full" />
            <div className="z-15 flex items-center justify-between mx-3 my-6">
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    format="DD/MM/YYYY"
                    label="Check in"
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
                    label="Check out"
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
            <div className="absolute top-0 right-0 transform translate-y-[0] translate-x-[100%]">
              <Calendar
                isOpen={open}
                onClick={handleClose}
                padding="pt-0"
                value={dateRange}
                onChange={(value) => {
                  setDateRange(value.selection);
                  setDateCheckIn(dayjs(value.selection.startDate));
                  setDateCheckOut(dayjs(value.selection.endDate));
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.PLAN ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;

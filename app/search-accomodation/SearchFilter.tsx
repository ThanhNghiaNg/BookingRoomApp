"use client";
import axios from "axios";
import qs from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Calendar from "../components/inputs/Calendar";
import { Range } from "react-date-range";
import { TextField } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";

type Props = {
  filtersProps: any;
  currentUser?: any;
  searchParams: any;
  setResetPageInfo: (value: boolean) => void;
};

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

export default function SearchFilter({
  filtersProps,
  searchParams,
  currentUser,
  setResetPageInfo,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const today = useMemo(() => new Date(), []);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const todayJs = useMemo(() => dayjs(today.toString()), [today]);

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs>(todayJs);
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs>(todayJs);

  useEffect(() => {
    setLocation(searchParams.locationValue);
    setGuestCount(searchParams.guestCount);
    setRoomCount(searchParams.roomCount);
    setBathroomCount(searchParams.bathroomCount);

    setDateRange({
      startDate: new Date(searchParams.startDate),
      endDate: new Date(searchParams.endDate),
    });
    const startDate = new Date(searchParams.startDate);
    const endDate = new Date(searchParams.endDate);

    setDateCheckIn(dayjs(startDate.toString()));
    setDateCheckOut(dayjs(endDate.toString()));
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors }, // TODO: update errore mess, docs: https://www.react-hook-form.com/api/useform/formstate/
  } = useForm<FieldValues>({
    defaultValues: {
      location: searchParams.locationValue || "",
    },
  });
  const handleFocus = () => {
    setOpen(true);
    setFocus(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFocus(false);
  };

  const onSubmit = handleSubmit((data) => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      // TODO: update type
      ...currentQuery,
      locationValue: data.location,
      guestCount: guestCount || 1,
      roomCount: roomCount || 1,
      bathroomCount: bathroomCount || 1,
      page: 1,
      pageSize: 8,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    setResetPageInfo(true);
    const url = qs.stringifyUrl(
      {
        url: "/search-accomodation",
        query: updatedQuery,
      },
      { skipNull: true }
    );

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
  });
  return (
    <div className="flex gap-4 justify-center align-bottom">
      <div>
        <Input
          id="location"
          label="Anywhere"
          register={register}
          errors={errors}
          required
        />
      </div>
      <div onFocus={handleFocus} className="flex flex-col items-end">
        <div className="z-15 flex items-center justify-between">
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
        <div className="absolute top-0 transform translate-y-[12rem] translate-x-[8rem] z-10">
          <Calendar
            isOpen={open}
            onClick={handleClose}
            padding="pt-0"
            value={dateRange}
            onChange={(value) => {
              console.log({ value });
              setDateRange(value.range1);
              setDateCheckIn(dayjs(value.range1.startDate));
              setDateCheckOut(dayjs(value.range1.endDate));
            }}
          />
        </div>
      </div>
      <TextField
        label="Guest"
        type="number"
        value={guestCount}
        onChange={(e) => setGuestCount(Number(e.target.value))}
      ></TextField>
      <TextField
        label="Rooms"
        type="number"
        value={roomCount}
        onChange={(e) => setRoomCount(Number(e.target.value))}
      ></TextField>
      <TextField
        label="Bathrooms"
        type="number"
        value={bathroomCount}
        onChange={(e) => setBathroomCount(Number(e.target.value))}
      ></TextField>
      <div onClick={onSubmit}>
        <Button label="Search" className="px-4"></Button>
      </div>
    </div>
  );
}

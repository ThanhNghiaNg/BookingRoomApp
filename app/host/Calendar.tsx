import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";

const Calendar = ({
  reservations = [],
  selectedRoom = "",
}: {
  reservations: any[];
  selectedRoom?: string;
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const monthOptions = Array.from({ length: 12 }, (_, index) => ({
      label: dayjs().month(index).format("MMMM"),
      value: index,
    }));

    const yearOptions = Array.from({ length: 10 }, (_, index) => ({
      label: 2023 + index,
      value: 2023 + index,
    }));

    setMonths(monthOptions as any);
    setYears(yearOptions as any);
  }, []);

  const daysInMonth = (date: any) => {
    return date.daysInMonth();
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => prevDate.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setSelectedDate((prevDate) => prevDate.subtract(1, "month"));
  };

  const handleMonthChange = (event: any) => {
    setSelectedDate((prevDate) => prevDate.month(event.target.value));
  };

  const handleYearChange = (event: any) => {
    setSelectedDate((prevDate) =>
      prevDate.year(parseInt(event.target.value, 10))
    );
  };

  const renderData = useMemo(() => {
    return (
      reservations?.filter(
        (item: any) =>
          item?.accommodationId?.$oid === selectedRoom ||
          item?.accommodationId === selectedRoom
      ) || []
    );
  }, [reservations, selectedRoom]);

  return (
    <div className="flex flex-col flex-1 w-full h-full bg-custom-gray">
      <div className="flex items-center justify-between mb-4">
        <button
          className="px-3 py-2 text-base font-bold text-white bg-red-200 rounded-md shadow ring-1 ring-red-200"
          onClick={handlePreviousMonth}
        >
          Previous Month
        </button>
        <div className="flex flex-row items-center justify-center h-full ">
          <div className={"bg-green-400 h-5 w-5 rounded mr-3"} />
          <span>: The first day check in of guest</span>
        </div>

        <div className="flex flex-row items-center justify-center h-full">
          <div className={"bg-[#b0e5eb] h-5 w-5 rounded mr-3"} />
          <span>: During using</span>
        </div>
        <div className="relative flex flex-row items-center justify-between">
          <div className="flex flex-row ml-3">
            <select
              value={selectedDate.month()}
              className="py-2 pl-1 text-base font-bold text-white bg-[#fb06a4] outline-none rounded-l-md ring-1 ring-zinc-100"
              onChange={handleMonthChange}
            >
              {months.map((month: any) => (
                <option
                  className="font-medium"
                  key={month.value}
                  value={month.value}
                >
                  {month.label}
                </option>
              ))}
            </select>
            <select
              value={selectedDate.year()}
              onChange={handleYearChange}
              className="py-2 pr-1 text-base font-bold text-white -translate-x-1 bg-[#fb06a4] outline-none rounded-r-md ring-0 "
            >
              {years.map((year: any) => (
                <option
                  className="font-medium"
                  key={year.value}
                  value={year.value}
                >
                  {year.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center h-full">
          <div className={"bg-red-400 h-5 w-5 rounded mr-3"} />
          <span>: The day check out of guest</span>
        </div>
        <div className="flex flex-row items-center justify-center h-full">
          <div className={"bg-white h-5 w-5 rounded mr-3 ring-1"} />
          <span>: Available</span>
        </div>
        <button
          className="px-3 py-2 text-base font-bold text-white bg-red-200 rounded-md shadow ring-1 ring-red-200 w-36"
          onClick={handleNextMonth}
        >
          Next Month
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4 mt-5">
        {Array.from({ length: daysInMonth(selectedDate) }, (_, index) => {
          let isHaveScheduler = false;
          let isEndDate = false;
          let isStartDate = false;

          renderData?.map((item: any, idx: number) => {
            const month =
              selectedDate.month() + 1 < 10
                ? "0" + (selectedDate.month() + 1)
                : selectedDate.month() + 1;
            const day = index + 1 < 10 ? "0" + (index + 1) : index + 1;
            const year = selectedDate.year();
            const currentTime = dayjs(
              dayjs(
                "" + year + month + day + "070000",
                "YYYYMMDDHHmmss"
              ).toISOString(),
              "YYYYMMDDHHmmss"
            );
            const start_date = item?.startDate?.$date
              ? dayjs(
                  dayjs(item?.startDate?.$date).format("YYYYMMDD") + "000000",
                  "YYYYMMDDHHmmss"
                )
              : dayjs(
                  dayjs(item?.startDate).format("YYYYMMDD") + "000000",
                  "YYYYMMDDHHmmss"
                );
            const end_date = item?.endDate?.$date
              ? dayjs(
                  dayjs(item?.endDate?.$date).format("YYYYMMDD") + "000000",
                  "YYYYMMDDHHmmss"
                )
              : dayjs(
                  dayjs(item?.endDate).format("YYYYMMDD") + "000000",
                  "YYYYMMDDHHmmss"
                );
            const checkStartDay = currentTime.diff(start_date, "milliseconds");
            const checkEndDay = currentTime.diff(end_date, "milliseconds");

            if (checkStartDay >= 0 && checkEndDay <= 0) {
              isHaveScheduler = checkStartDay >= 0 && checkEndDay <= 0;
            }

            if (checkStartDay === checkEndDay && checkEndDay === 0) {
              isHaveScheduler = true;
            }

            if (checkEndDay === 0) {
              isEndDate = true;
            }

            if (checkStartDay === 0) {
              isStartDate = true;
            }
          });

          return (
            <div
              key={index}
              className={
                "border min-h-[180px] rounded-lg shadow bg-[#f7f2ee] flex flex-1 flex-col min-w-[100px]"
              }
            >
              <div className="flex justify-center w-full pt-2 text-xl font-bold text-orange-500 max-h-9">
                {index + 1}
              </div>

              <div
                className={
                  "flex flex-1 flex-col " +
                  (isHaveScheduler ? "bg-green-300" : "bg-white")
                }
              >
                {isHaveScheduler && (
                  <>
                    {isStartDate && (
                      <div
                        className={
                          "bg-green-400 flex flex-1 justify-center items-center text-white font-medium text-base"
                        }
                      >
                        Check In Day
                      </div>
                    )}
                    {!isEndDate && !isStartDate && (
                      <div
                        className={
                          "bg-[#b0e5eb] flex flex-1 justify-center items-center text-white font-medium text-base"
                        }
                      >
                        Using
                      </div>
                    )}
                    {isEndDate && (
                      <div
                        className={
                          "bg-red-400 flex flex-1 justify-center items-center text-white font-medium text-base"
                        }
                      >
                        Check Out Day
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { SafeReservation } from "../types";

dayjs.extend(utc);

interface SeriesData {
  name: string;
  data: number[];
}

interface FormattedData {
  categories: string[];
  series: SeriesData[];
}

function getCurrentWeekRange(currentDate: Date): { start: Dayjs; end: Dayjs } {
  const startOfWeek = dayjs(currentDate).utc().startOf("week");
  const endOfWeek = startOfWeek.add(7, "day").subtract(1, "millisecond");
  return {
    start: startOfWeek,
    end: endOfWeek,
  };
}

function getPreviousWeekRange(currentDate: Date): { start: Dayjs; end: Dayjs } {
  const startOfPreviousWeek = dayjs(currentDate)
    .utc()
    .subtract(1, "week")
    .startOf("week");
  const endOfPreviousWeek = startOfPreviousWeek
    .add(7, "day")
    .subtract(1, "millisecond");
  return {
    start: startOfPreviousWeek,
    end: endOfPreviousWeek,
  };
}

function getWeekIndex(
  type: "week" | "month" | "year",
  dateToCheck: string,
  startDay?: Dayjs,
  endDay?: Dayjs
): number | null {
  const currentDate = dayjs(new Date()).utc();

  const startOfWeek = startDay?.utc();
  const endOfWeek = endDay?.utc();
  const date = dayjs(dateToCheck).utc();

  if (
    date.isAfter(startOfWeek) &&
    date.isBefore(endOfWeek) &&
    (type === "week" || type === undefined)
  ) {
    return date.get("days");
  }

  if (
    date.isAfter(startOfWeek) &&
    date.isBefore(endOfWeek) &&
    type === "month"
  ) {
    return date.get("date");
  }

  if (type === "year" && currentDate.get("year") === date.get("year")) {
    return date.get("month") + 1;
  }

  return null;
}

interface MonthRange {
  startDate: Dayjs;
  endDate: Dayjs;
}

function getMonthRange(): {
  currentMonth: MonthRange;
  previousMonth: MonthRange;
} {
  const currentDate = new Date();
  const currentMonthStart = dayjs(currentDate).startOf("month");
  const currentMonthEnd = dayjs(currentDate).endOf("month");
  const previousMonthStart = currentMonthStart.subtract(1, "month");
  const previousMonthEnd = previousMonthStart.endOf("month");

  return {
    currentMonth: {
      startDate: currentMonthStart,
      endDate: currentMonthEnd,
    },
    previousMonth: {
      startDate: previousMonthStart,
      endDate: previousMonthEnd,
    },
  };
}

export function formatData(
  reservationData: SafeReservation[]
): Record<string, FormattedData> {
  const { currentMonth, previousMonth } = getMonthRange();
  const newDate = new Date().toDateString();

  const maxDay =
    currentMonth.endDate.get("date") > previousMonth.endDate.get("date")
      ? currentMonth.endDate.get("date")
      : previousMonth.endDate.get("date");

  const currentDate = new Date(); // Change to your desired current date

  const currentWeekRange = getCurrentWeekRange(currentDate);
  const previousWeekRange = getPreviousWeekRange(currentDate);
  // monthlyCategories

  const dailyCategories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const yearly1Categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyCategories = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
  ];

  while (monthlyCategories.length < maxDay) {
    monthlyCategories.push(monthlyCategories.length + "");
  }

  const dailyRentalIncomeData = new Array<number>(7).fill(0);
  const dailyPreviousWeekData = new Array<number>(7).fill(0);

  const yearRentalIncomeData = new Array<number>(12).fill(0);
  const previousYearData = new Array<number>(12).fill(0);

  const monthRentalIncomeData = new Array<number>(
    monthlyCategories.length
  ).fill(0);
  const previousMonthData = new Array<number>(monthlyCategories.length).fill(0);

  for (const reservation of reservationData) {
    const totalPrice = reservation.totalPrice;

    const currentWeekIndex = getWeekIndex(
      "week",
      reservation.createdAt,
      currentWeekRange.start,
      currentWeekRange.end
    );

    const previousWeekIndex = getWeekIndex(
      "week",
      reservation.createdAt,
      previousWeekRange.start,
      previousWeekRange.end
    );

    if (currentWeekIndex !== null) {
      dailyRentalIncomeData[currentWeekIndex] += totalPrice;
    }

    if (previousWeekIndex !== null) {
      dailyPreviousWeekData[previousWeekIndex] += totalPrice;
    }

    const currentMonthIndex = getWeekIndex(
      "month",
      reservation.createdAt,
      currentMonth.startDate,
      currentMonth.endDate
    );

    const previousMonthIndex = getWeekIndex(
      "month",
      reservation.createdAt,
      previousMonth.startDate,
      previousMonth.endDate
    );

    if (currentMonthIndex !== null) {
      monthRentalIncomeData[currentMonthIndex] += totalPrice;
    }

    if (previousMonthIndex !== null) {
      previousMonthData[previousMonthIndex] += totalPrice;
    }

    const currentYearIndex = getWeekIndex("year", reservation.createdAt);

    const previousYearIndex = getWeekIndex("year", reservation.createdAt);

    if (currentYearIndex !== null) {
      yearRentalIncomeData[currentYearIndex] += totalPrice;
    }

    if (previousYearIndex !== null) {
      previousYearData[previousYearIndex] += totalPrice;
    }
  }

  return {
    daily: {
      categories: dailyCategories,
      series: [
        { name: "Previous Week", data: dailyPreviousWeekData },
        { name: "Rental Income", data: dailyRentalIncomeData },
      ],
    },
    monthly: {
      categories: yearly1Categories,
      series: [
        { name: "Previous Month", data: previousMonthData },
        { name: "Rental Income", data: monthRentalIncomeData },
      ],
    },
    yearly: {
      categories: monthlyCategories,
      series: [
        { name: "Previous Year", data: previousYearData },
        { name: "Rental Income", data: yearRentalIncomeData },
      ],
    },
  };
}

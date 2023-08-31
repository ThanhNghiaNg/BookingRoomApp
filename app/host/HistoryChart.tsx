// AreaChart.js
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import { SafeReservation } from "../types";
import { formatData } from "./fomatData";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const HistoryChart = ({ data }: { data: SafeReservation[] }) => {
  const renderData: any = formatData(data);

  const [timePeriod, setTimePeriod] = useState("daily");

  const options: any = {
    chart: {
      type: "area",
      stacked: false,
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: renderData[timePeriod].categories,
    },
    yaxis: {
      title: {
        text: "Rental Income (USD)",
      },
    },
    legend: {
      position: "top",
    },
  };

  const handleTimePeriodChange = (event: any) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div>
      <div>
        <select
          className="p-2 pr-4 text-base text-white bg-red-300 border-none rounded shadow-md ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-red-300 "
          value={timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="daily">Daily History</option>
          <option value="monthly">Monthly History</option>
          <option value="yearly">Yearly History</option>
        </select>
      </div>
      <ReactApexChart
        options={options}
        series={renderData[timePeriod].series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default HistoryChart;

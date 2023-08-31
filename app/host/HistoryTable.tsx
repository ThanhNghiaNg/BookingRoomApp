// RentalHistoryTable.js
import { useState } from "react";
import dayjs from "dayjs";

import { Tooltip } from "@mui/material";
import { SafeReservation } from "../types";
import { GiReceiveMoney } from "react-icons/gi";

const HistoryTable = ({ data }: { data: SafeReservation[] }) => {
  const header: any[] = [
    {
      value: "type",
      label: " ",
      headerStyle: "w-[100px]",
      cellStyle: "item-center justify-center flex",
      renderAs: (data: any) => {
        return (
          <div className="relative flex items-center justify-center p-0 border rounded-full shadow-md w-14 h-14">
            <GiReceiveMoney color="#88f2a4" size={24} />

            <div className="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
              <label className="text-sm text-center text-white">✔</label>
            </div>
          </div>
        );
      },
    },
    { value: "name", label: "Name" },
    {
      value: "content",
      label: "Content",
      renderAs: (data: any) => (
        <Tooltip
          title={
            data?.status === "success"
              ? `Your room with Id ${data?.accommodationId?.["$oid"]} already booked success`
              : "-"
          }
          placement="bottom"
        >
          <p>
            {data?.status === "success"
              ? `Your room with Id ${data?.accommodationId?.["$oid"]} already booked success`
              : "-"}
          </p>
        </Tooltip>
      ),
    },
    // { value: 'status', label: 'Status' },
    {
      value: "createdAt",
      label: "Create At",
      cellStyle: "text-center",
      renderAs: (data: any) => (
        <Tooltip
          title={dayjs(data?.createdAt?.["$date"]).format(
            "DD/MM/YYYY-hh:mm:ss"
          )}
          placement="bottom"
        >
          <p>
            {dayjs(data?.createdAt?.["$date"]).format("DD/MM/YYYY-hh:mm:ss") ||
              ""}
          </p>
        </Tooltip>
      ),
    },
    {
      value: "startDate",
      label: "Start Date",
      cellStyle: "text-center",
      renderAs: (data: any) => (
        <Tooltip
          title={dayjs(data?.startDate?.["$date"]).format("DD/MM/YYYY")}
          placement="bottom"
        >
          <p>{dayjs(data?.startDate?.["$date"]).format("DD/MM/YYYY")}</p>
        </Tooltip>
      ),
    },
    {
      value: "endDate",
      label: "End Date",
      cellStyle: "text-center",
      renderAs: (data: any) => (
        <Tooltip
          title={dayjs(data?.endDate?.["$date"]).format("DDMMYYYY")}
          placement="bottom"
        >
          <p>{dayjs(data?.endDate?.["$date"]).format("DDMMYYYY")}</p>
        </Tooltip>
      ),
    },
    {
      value: "totalPrice",
      label: "Price",
      cellStyle: "text-right text-[#11b63d] font-bold text-base",
      renderAs: (data: any) => {
        return (
          <Tooltip
            title={
              (data?.status !== "success" ? "-" : "+") + data?.totalPrice + " $"
            }
            placement="bottom"
          >
            <p>
              {(data?.status !== "success" ? "-" : "+") +
                data?.totalPrice +
                " $"}
            </p>
          </Tooltip>
        );
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const totalPage = Math.ceil(data?.length / 15) || 1;

  const renderPage = () => {
    const emptyArray = new Array<number>(totalPage).fill(0);
    console.log(emptyArray, totalPage);

    return (
      <div className="flex justify-start w-full gap-2 ">
        {emptyArray.map((_, index) => {
          return (
            <div
              key={index}
              className="flex justify-center w-10 h-10 mt-5 text-base text-center text-black bg-gray-100 rounded align-center"
              onClick={() => {
                onChangePage(index);
              }}
            >
              <p className="p-2">{index + 1}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDate = data?.slice?.(currentPage * 15, (currentPage + 1) * 15);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            {header.map((item: any) => {
              const headerStyle = item?.headerStyle || "text-center";
              return (
                <th
                  key={item.value}
                  className={`font-bold text-gray-800 ${headerStyle} w-auto`}
                >
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {renderDate.map((item: any, rowIndex: any) => (
            <tr key={rowIndex} className="border-t-2 even:bg-slate-100">
              {header.map((column: any) => {
                const renderCellContent = column?.renderAs;
                const cellValue = item[column.value];

                const cellStyle = column?.cellStyle || "text-left";

                return (
                  <td
                    key={column.value}
                    className={`p-2 overflow-hidden whitespace-nowrap ${cellStyle}`}
                  >
                    {renderCellContent ? (
                      renderCellContent(item)
                    ) : (
                      <Tooltip title={cellValue} placement="bottom">
                        <span>{cellValue}</span>
                      </Tooltip>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full h-[1px] bg-zinc-400" />
      {totalPage > 2 && renderPage()}
    </>
  );
};

export default HistoryTable;

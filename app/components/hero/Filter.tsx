"use client";

import { Button } from "antd";
import {
  DownOutlined,
  GlobalOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

const items: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const Filter = ({ className = "" }) => {
  return (
    <div className={`h-auto ${className}`}>
      <div
        className="
        border-[1px] 
        w-wull
        py-2
        px-6 
        rounded-xl
        shadow-lg
        hover:shadow-md
        transition 
        cursor-pointer
        bg-white"
      >
        <div
          className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
        >
          <div
            className="
            text-sm 
            font-semibold 
            flex-1
            mb-1
          "
          >
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <p className="flex items-center gap-1">
                  <GlobalOutlined
                    rev={undefined}
                    className="text-xs text-primary"
                  />
                  Location
                  <DownOutlined rev={undefined} className="text-xs" />
                </p>
              </a>
            </Dropdown>

            <p className="text-xs">Where do you wanna go?</p>
          </div>

          <div
            className="
            text-sm 
            font-semibold 
            flex-1
            hidden 
            sm:block
            mb-1
          "
          >
            <a onClick={(e) => e.preventDefault()}>
              <p className="flex items-center gap-1">
                <UserOutlined
                  rev={undefined}
                  className="text-xs text-primary"
                />
                People
                <DownOutlined rev={undefined} className="text-xs" />
              </p>
            </a>
            <p className="text-xs">How many people?</p>
          </div>

          <div
            className="
            font-semibold 
            text-sm
            flex-1
            sm:block 
            mb-1
            
          "
          >
            <a onClick={(e) => e.preventDefault()}>
              <p className="flex items-center gap-1">
                <CalendarOutlined
                  rev={undefined}
                  className="text-xs text-primary"
                />
                Date
                <DownOutlined rev={undefined} className="text-xs" />
              </p>
            </a>
            <p className=" none lg:block lg:text-xs ">
              When do you want to go there?
            </p>
          </div>

          <button className="p-1 flex-[0.5] bg-primary text-light font-bold rounded-md hover:rounded-2xl transition-all duration-100 ease-in">
            Explore Now
          </button>
        </div>
      </div>

      <div className="mt-6">
        <b>Popular Searches:</b> Hiking, Starbucks, Fishing, Hotels,...
      </div>
    </div>
  );
};

export default Filter;

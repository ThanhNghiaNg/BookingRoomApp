"use client";

import { BiMedal } from "react-icons/bi";
import { BsHeadset } from "react-icons/bs";
import { SafeUser } from "../types";
import { Tooltip } from "@mui/material";

const HELP_DATA = [
  {
    icon: <BiMedal />,
    title: "Instructions from a Superhost",
    content:
      "We'll connect you with an experienced Landlord to help you get started.",
  },
  {
    icon: <BsHeadset />,
    title: "Contact special support",
    content:
      "As a new Host, you can contact a specially trained support team with just one tap.",
  },
];

const RESOURCE_DATA = [
  {
    image:
      "https://kenh14cdn.com/thumb_w/620/2020/4/9/money-heist-season-4-2019-l7-15864079843781659894823.jpg",
    title: "How to receive payment when welcoming guests",
  },
  {
    image:
      "https://cdn.tgdd.vn/Files/2020/03/18/1242957/4448367_chup_anh_bphone_3_800x450.jpg",
    title: "How to take beautiful photos with your phone",
  },
  {
    image:
      "https://reviewvilla.vn/wp-content/uploads/2022/05/quan-cafe-dep-o-Sapa-3.jpg",
    title: "Best practices for setting up calendar and booking settings",
  },
  {
    image:
      "https://minhuongpynie.com/wp-content/uploads/2021/01/viet-lach-la-gi-10-840x400.jpg",
    title:
      "How to write effective description content for a house/room for rent",
  },
];

function HelpClient({ currentUser }: { currentUser: SafeUser | null }) {
  return (
    <>
      {/* help view */}
      <div className="flex flex-col w-full">
        <p className="mb-5 text-2xl text-black">We're always here to help</p>
        <Tooltip
          title="Coming soon in next version"
          disableFocusListener
          disableTouchListener
          followCursor
          placement="bottom-start"
        >
          <div className="flex flex-row justify-start">
            {HELP_DATA?.map((item, index) => {
              return (
                <div
                  className="flex flex-row justify-between p-4 mr-4 rounded-lg ring-1 ring-gray-300"
                  key={index}
                >
                  {item?.icon}
                  <div className="flex flex-col w-[380px] pl-4">
                    <p className="text-base text-black">{item?.title}</p>

                    <p className="text-sm">{item?.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Tooltip>
      </div>

      <div className="flex flex-col w-full mt-16">
        <p className="mb-5 text-2xl text-black">Resources and tips</p>
        <Tooltip
          title="Coming soon in next version"
          disableFocusListener
          disableTouchListener
          followCursor
          placement="bottom-start"
        >
          <div className="flex flex-row justify-start">
            {RESOURCE_DATA?.map((item, index) => {
              return (
                <div
                  className="flex flex-col mr-4 rounded-lg ring-1 ring-gray-300"
                  key={index}
                >
                  <img
                    src={item?.image}
                    alt={`resource ${index}`}
                    className="h-[250px] w-[330px] rounded-tl-lg rounded-tr-lg"
                  />
                  <div className="flex w-[300px] h-[100px] items-center justify-center p-6">
                    <p className="text-base text-black">{item?.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Tooltip>
      </div>
    </>
  );
}

export default HelpClient;

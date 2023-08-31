"use client";

import { BiMedal } from "react-icons/bi";
import { BsHeadset } from "react-icons/bs";
import { SafeUser } from "../types";
import { Tooltip } from "@mui/material";

const HELP_DATA = [
  {
    icon: <BiMedal />,
    title: "Hướng dẫn từ một Chủ nhà siêu cấp",
    content:
      "Chúng tôi sẽ kết nối bạn với một Chủ nhà giàu kinh nghiệm để giúp bạn bắt đầu.",
  },
  {
    icon: <BsHeadset />,
    title: "Liên hệ bộ phận hỗ trợ đặc biệt",
    content:
      "Là Chủ nhà mới, bạn có thể liên hệ với nhóm hỗ trợ đã được đào tạo đặc biệt chỉ với một thao tác&nbsp;nhấn.",
  },
];

const RESOURCE_DATA = [
  {
    image:
      "https://kenh14cdn.com/thumb_w/620/2020/4/9/money-heist-season-4-2019-l7-15864079843781659894823.jpg",
    title: "Cách nhận tiền chi trả khi đón tiếp khách",
  },
  {
    image:
      "https://cdn.tgdd.vn/Files/2020/03/18/1242957/4448367_chup_anh_bphone_3_800x450.jpg",
    title: "Cách  chụp ảnh đẹp bằng điện thoại",
  },
  {
    image:
      "https://reviewvilla.vn/wp-content/uploads/2022/05/quan-cafe-dep-o-Sapa-3.jpg",
    title:
      "Các tốt nhất để thiết lập các tùy chọn cài đặt về lịch và đặt phòng",
  },
  {
    image:
      "https://minhuongpynie.com/wp-content/uploads/2021/01/viet-lach-la-gi-10-840x400.jpg",
    title: "Cách viết nọi dung mô tả hiêu quả cho nhà/phòng cho thuê",
  },
];

function HelpClient({ currentUser }: { currentUser: SafeUser | null }) {
  return (
    <>
      {/* help view */}
      <div className="flex flex-col w-full">
        <p className="mb-5 text-2xl text-black">
          Chúng tôi luôn sẵn sàng trợ giúp
        </p>
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
        <p className="mb-5 text-2xl text-black">Tài nguyên và mẹo</p>
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

"use client";

import { Card } from "antd";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
import { GiArmadillo } from "react-icons/gi";
import { BsFillSkipStartCircleFill } from "react-icons/bs";
import { MdContactMail } from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import { AiFillPhone } from "react-icons/ai";

interface InfoHostProps {
  user: SafeUser;
  userClerk: {
    name: string;
    phone: string;
    email: string | null;
    avatar: string;
  };
}

const InfoHost: React.FC<InfoHostProps> = ({ user, userClerk }) => {
  const date = new Date(user.createdAt);

  return (
    <div>
      <Card
        style={{ width: "100%", backgroundColor: "#f0efe9" }}
        className="flex flex-col items-center mt-4"
      >
        <Card className="mt-4 shadow-xl rounded-2xl">
          <div className="flex flex-col items-center justify-aro und">
            <Avatar src={userClerk?.avatar} width={160} height={160} />
            <div className="flex flex-col items-center mt-4">
              <div className="flex flex-row flex-wrap items-center gap-2 text-xl font-semibold ">
                {user.name}
              </div>
              <div className="mt-4 text-lg font-light text-neutral-500">
                {userClerk?.name ? userClerk?.name : "Chủ nhà"}
              </div>
            </div>
          </div>
        </Card>
        <div className="flex items-center mt-8 mb-4 text-lg font-light text-neutral-500">
          <MdContactMail className="mr-2" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center mt-4 text-lg font-light text-neutral-500">
          <AiFillPhone className="mr-2" />
          <span>{userClerk?.phone} </span>
        </div>
        <div className="flex items-center my-4 text-lg font-light text-neutral-500">
          <BsFillSkipStartCircleFill className="mr-2" />
          <span>{`Đã tham gia tháng ${
            date.getMonth() + 1
          }, năm ${date.getFullYear()} `}</span>
        </div>
        <hr />
        <div>
          <span className="flex flex-wrap max-w-sm my-4 italic font-light text-neutral-500">
            Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc
            liên lạc bên ngoài trang web của chúng tôi.
          </span>
        </div>
      </Card>
    </div>
  );
};

export default InfoHost;

"use client";

import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

const YOUR_CHANNEL_NAME = "my-channel";
const YOUR_EVENT_NAME = "my-event";
const NEXT_PUBLIC_PUSHER_KEY = "c0089d0f975697ce31ba";
const NEXT_PUBLIC_PUSHER_CLUSTER = "ap1";
const YOUR_INSTANCE_ID_HERE = "95a34726-b970-45ca-a848-347f26ad6041";
const SECRET_KEY = "7980e43373b353b732dd";
const APP_ID = "1663518";
const INSTANCE_ID = "95a34726-b970-45ca-a848-347f26ad6041";

const pusher = new Pusher(NEXT_PUBLIC_PUSHER_KEY, {
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
});

import axios from "axios";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/app/types";
import isUserLoginModal from "@/app/hooks/useIsLogin";
import { createNewNotification, pushNotification } from "./pushNotification";

const Notification = () => {
  const [currentUser, setCurrentUser] = useState<SafeUser | null>();

  const { isLogin } = isUserLoginModal();

  useEffect(() => {
    try {
      axios.post(`/api/getUser`, {}).then((res: any) => {
        setCurrentUser(res?.data as SafeUser | null);
      });
    } catch (error) {
      console.log("error get user", error);
    }
  }, [isLogin]);

  useEffect(() => {
    const channel = pusher.subscribe(YOUR_CHANNEL_NAME);

    channel.bind(YOUR_EVENT_NAME, (data: string) => {
      console.log("notification data", data);

      if (!!data && currentUser?.id === data.split("*/*/*")[0]) {
        toast.success(
          (t) => (
            <div onClick={() => toast.dismiss(t.id)}>
              `{data.split("*/*/*")[1]}
              {"\n"} Please check your notification to get more information`
            </div>
          ),

          { duration: 60000, position: "bottom-left" }
        );

        // createNewNotification({
        //   data: data.split("*/*/*"),
        // });
      }
    });

    return () => {
      pusher.unsubscribe(YOUR_CHANNEL_NAME);
    };
  }, [currentUser]);

  // const pushNotification = async ({
  //   userId = "64ecd940cab4fa0e8fa8852a",
  //   content = "You have a new reservation 1235543345",
  //   type = "test",
  //   parnerID,
  //   parnerAvatar,
  // }: {
  //   userId?: string;
  //   content?: string;
  //   type?: string;
  //   parnerID?: string;
  //   parnerAvatar?: string;
  // }) => {
  //   await axios
  //     .post(
  //       // `http://localhost:3030/notification`,
  //       "https://travelnest-4sn7.onrender.com/notification",
  //       {
  //         data:
  //           `${userId}*/*/*${content}*/*/*${type}` +
  //           (parnerID && parnerAvatar
  //             ? `*/*/*${parnerID}*/*/*${parnerAvatar}`
  //             : ""),
  //       },
  //       {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Headers":
  //             "Origin, X-Requested-With, Content-Type, Accept",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // console.log("resssss", res);
  //     });
  // };

  return (
    <>
      {/* <button onClick={pushNotification}>push notification</button>
      <h2>Notifications</h2> */}
    </>
  );
};

export default Notification;

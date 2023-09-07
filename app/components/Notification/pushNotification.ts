import axios from "axios";

export async function pushNotification({
  userId = "64ecd940cab4fa0e8fa8852a",
  content = "You have a new reservation 1235543345",
  type = "test",
  parnerID,
  parnerAvatar,
}: {
  userId?: string;
  content?: string;
  type?: string;
  parnerID?: string;
  parnerAvatar?: string;
}) {
  await axios
    .post(
      // `http://localhost:3030/notification`,
      "https://travelnest-4sn7.onrender.com/notification",
      {
        data:
          `${userId}*/*/*${content}*/*/*${type}` +
          (parnerID ? `*/*/*${parnerID}` : "") +
          (parnerAvatar ? `*/*/*${parnerAvatar}` : ""),
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      // console.log("resssss", res);
    });
}

export async function createNewNotification({ data }: { data: string[] }) {
  console.log("arg", data);
  const [userId = "", content = "", type = "test", parnerID, parnerAvatar] =
    data;
  const notificationData = {
    type,
    userId,
    content,
    ...(parnerID && parnerAvatar ? { parnerID, parnerAvatar } : {}),
  };

  await axios.post(`/api/notification`, { notificationData });
}

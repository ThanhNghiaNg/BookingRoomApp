import { AiOutlineTeam } from "react-icons/ai";
import { BsHouse } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";

export const accommodation_type = [
  {
    label: "Place of residence",
    icon: BsHouse,
    description: "Guests have exclusive use of the entire place",
    value: 1,
  },
  {
    label: "By room",
    icon: MdMeetingRoom,
    description: "Guests are allowed to use only room of their choice",
    value: 0,
  },
  {
    label: "Shared room",
    icon: AiOutlineTeam,
    description:
      "Guests have access to a shared room where other guests - or groups of friends can use",
    value: 2,
  },
];

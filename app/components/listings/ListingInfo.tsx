import { IconType } from "react-icons";
import { SafeUser } from "@/app/types";
import ListingCategory from "./ListingCategory";
import { feature_list } from "@/data/Featured";
import { convenient_list } from "@/data/convenient";
import { ListingBox } from "./ListingBox";
import { FaPeopleCarry } from "react-icons/fa";
import { GiBathtub, GiFamilyHouse } from "react-icons/gi";
import ListingItem from "./ListingItem";
import InfoHost from "./InfoHost";
import ListingProperties from "./ListingProperties";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  type: string;
  category: string;
  feature: string[];
  convenient: string[];
  clerkID: User;
}

/*@ts-expect-error */
const ListingInfo: React.FC<ListingInfoProps> = async ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  type,
  category,
  feature,
  convenient,
  clerkID,
}): Promise<Element> => {
  const features = feature_list.filter((item) => {
    return feature.find((ft) => ft === item.label);
  });

  const convenients = convenient_list.filter((item) => {
    return convenient.find((cn) => cn === item.label);
  });

  // const userClerk = await clerkClient.users.getUser(clerkID.userClerkId);

  const inforHost = {
    name: `${clerkID?.firstName} ${clerkID?.lastName}`,
    phone: clerkID?.phoneNumbers[0].phoneNumber,
    email: user.email,
    avatar: clerkID?.imageUrl,
  };

  console.log("userClerk", inforHost);

  /*@ts-expect-error */
  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold ">
          {type}
        </div>
        <div className="flex flex-row items-center justify-between gap-4 mt-2 font-light text-neutral-500">
          <ListingBox label={`${guestCount} khách`} icon={FaPeopleCarry} />
          <ListingBox label={`${roomCount} phòng`} icon={GiFamilyHouse} />
          <ListingBox label={`${bathroomCount} nhà vệ sinh`} icon={GiBathtub} />
        </div>
      </div>
      <hr />
      <ListingProperties properties={category} />
      <hr />
      <div>
        <div className="flex flex-row items-center gap-2 text-xl font-semibold ">
          Nơi này có những gì cho bạn
        </div>
        <div className="grid w-full grid-cols-2 mt-4">
          <div className="flex flex-col col-span-1">
            {features.map((item) => {
              return (
                <ListingItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                />
              );
            })}
          </div>
          <div className="flex flex-col">
            {convenients.map((item) => {
              return (
                <ListingItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                />
              );
            })}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold ">
          Liên hệ chủ nhà
        </div>
        <InfoHost user={user} userClerk={inforHost} />
        <div className="flex flex-row items-center gap-2 mt-4 text-xl font-semibold ">
          Giới thiệu về nơi này
        </div>
        <div className="text-lg font-light text-neutral-500">{description}</div>
      </div>
    </div>
  );
};

export default ListingInfo;

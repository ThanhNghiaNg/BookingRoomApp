import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
// import { clerkClient, currentUser } from "@clerk/nextjs";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { StringifiableRecord } from "query-string";
import Avatar from "../Avatar";
import { AiFillEnvironment, AiFillPhone } from "react-icons/ai";
import ListingRate from "./ListingRate";
import ClientOnly from "../ClientOnly";
// import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User } from "@clerk/nextjs/dist/types/server";

interface ListingHeadProps {
  title: string;
  locationValue: { address: string; area: string };
  imageSrc: string;
  id: string;
  currentUserForLike?: SafeUser | null;
  user: SafeUser;
  rating: number;
  clerkID: User;
}

/*@ts-expect-error */
const ListingHead: React.FC<ListingHeadProps> = async ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUserForLike,
  user,
  clerkID,
  rating,
}): Promise<Element> => {
  // const [ratingState, setRatingState] = useState<number>(0);
  // const userClerk = await clerkClient.users.getUser(clerkID.userClerkId);

  // useEffect(() => {
  //   axios
  //     .delete(`/api/review-accommodation/${user?.id}`)
  //     .then((res) => {
  //       setRatingState(res.data);
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong.");
  //     })
  //     .finally(() => {});
  // }, [user?.id]);
  /*@ts-expect-error */
  return (
    <div>
      {/*@ts-expect-ernor Async Server Component */}
      <div className="grid items-center justify-center grid-cols-4">
        <div className="flex items-center col-span-3">
          <div className="h-full mr-4">
            <Avatar src={clerkID?.imageUrl} height={100} width={100} />
          </div>
          <div className={"text-start"}>
            <div className="text-4xl font-bold">{title}</div>
            <div className="flex items-center mt-2 font-light text-neutral-500">
              <AiFillEnvironment />
              <span className="ml-2">{`${locationValue.address} ,${locationValue.area}`}</span>
            </div>
            <div className="flex items-center mt-2 font-light text-neutral-500">
              <AiFillPhone />
              <span className="ml-2">{`${clerkID?.firstName} ${clerkID?.lastName} - mobile: ${clerkID?.phoneNumbers[0].phoneNumber} - email: ${user.email}`}</span>
            </div>
          </div>
        </div>
        <ClientOnly>
          <div className="scale-125">
            <ListingRate disabled={true} value={rating} />
          </div>
        </ClientOnly>
      </div>
      {/* Image */}
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
          mt-4
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton accommodationId={id} currentUser={currentUserForLike} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;

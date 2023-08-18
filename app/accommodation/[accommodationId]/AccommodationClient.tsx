import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import {
  SafeAccommodation,
  SafeListing,
  SafeReservation,
  SafeUser,
} from "@/app/types";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import { accommodation_type } from "../../../data/AccommodationType";
import dynamic from "next/dynamic";
import Image from "next/image";
import ListingImage from "@/app/components/listings/ListingImage";
import ClientOnly from "@/app/components/ClientOnly";
import getInfroUserByClerk from "../../actions/getInfroUserByClerk";
import { ResType, ReviewType } from "@/app/actions/getReviewByAccId";
import ListingReview from "@/app/components/listings/ListingReview";

interface ListingClientProps {
  reservations?: SafeReservation[] | any;
  accommodation: SafeAccommodation & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reviewByAccId: ResType;
  reviewByUserId: ReviewType | null;
}
/*@ts-expect-error */
const AccommodationPage: React.FC<ListingClientProps> = async ({
  accommodation,
  reservations = [],
  currentUser,
  reviewByAccId,
  reviewByUserId,
}): Promise<Element> => {
  const Map = dynamic(() => import("../../components/Map"), {
    ssr: false,
  });

  const idClerk = await getInfroUserByClerk({ userID: accommodation.user.id });
  /*@ts-expect-error */
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-6">
          <ListingHead
            user={accommodation.user}
            title={accommodation.title}
            imageSrc={accommodation.image}
            locationValue={{
              address: accommodation.address,
              area: accommodation.area,
            }}
            id={accommodation.id}
            currentUserForLike={currentUser}
            clerkID={idClerk as any}
            rating={reviewByAccId.rating}
          />
          <div className="relative grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
            <ListingInfo
              type={accommodation.accommodationType}
              user={accommodation.user}
              category={accommodation.properties}
              description={accommodation.detailDescription}
              roomCount={accommodation.rooms}
              guestCount={accommodation.guest}
              bathroomCount={accommodation.bathrooms}
              feature={accommodation.featured}
              convenient={accommodation.convenient}
              clerkID={idClerk as any}
            />
            <ClientOnly>
              <div className="order-first mb-10 md:order-last md:col-span-3 z-10">
                <ListingReservation
                  id={accommodation.id}
                  price={accommodation.pricesPerDate}
                  currentUser={currentUser}
                  reservations={reservations}
                />
              </div>
            </ClientOnly>
          </div>
          <hr />
          <ClientOnly>
            <ListingReview
              currentUser={currentUser}
              reservation={reservations}
              accommodationId={accommodation.id}
              reviewByAccId={reviewByAccId}
              reviewByUserId={reviewByUserId}
            />
          </ClientOnly>
          <hr />
          <ListingImage
            images={[...accommodation.detailPictures, accommodation.image]}
          />
          <hr />
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 mb-4 text-xl font-semibold ">
              Nơi bạn sẽ đến
            </div>
            <Map address={accommodation.address} area={accommodation.area} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccommodationPage;

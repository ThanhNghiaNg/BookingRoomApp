import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getRoomsById from "@/app/actions/getListingById";
import AccommodationClient from "./AccommodationClient";
import getReviewByAccId, {
  ResType,
  ReviewType,
} from "@/app/actions/getReviewByAccId";
import getReviewByUserId from "@/app/actions/getReviewByUserId";

interface IParams {
  accommodationId?: string;
}

const AccommodationPage = async ({ params }: { params: IParams }) => {
  const accommodation = await getRoomsById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const reviewByAccId: ResType = await getReviewByAccId(params);
  const reviewByUserId: ReviewType | null = await getReviewByUserId({
    userId: currentUser?.id,
    accommodationId: params.accommodationId,
  });

  if (!accommodation) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  console.log({ serverPageaccommodation: accommodation });

  return (
    <AccommodationClient
      currentUser={currentUser}
      accommodation={accommodation}
      reservations={reservations}
      reviewByAccId={reviewByAccId}
      reviewByUserId={reviewByUserId}
    />
  );
};

export default AccommodationPage;

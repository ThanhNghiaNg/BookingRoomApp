import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";
import getReservations from "../actions/getReservations";
import Container from "@/app/components/Container";

import NavHistory from "./NavHistory";
import Heading from "../components/Heading";
import { SafeAccommodation, SafeReservation } from "../types";
import getFavoriteAccommodations from "../actions/getFavoriteAccommodations";
import ListingCard from "../components/listings/ListingCard";
import FavoritesClient from "./FavoritesClient";

interface SearchProps {
  searchParams: { tab: string };
}

const today = new Date();

const Search = async ({ searchParams }: SearchProps) => {
  const currentUser = await getCurrentUser();
  const reservations =
    (await getReservations({ userId: currentUser?.id })) || [];
  const favoriteAccommodations: SafeAccommodation[] =
    await getFavoriteAccommodations();
  const historyReservation: SafeReservation[] = [];
  const currentReservations: SafeReservation[] = [];

  reservations?.forEach((re: SafeReservation) => {
    if (new Date(re.endDate).getTime() < today.getTime()) {
      historyReservation.push(re);
    } else {
      currentReservations.push(re);
    }
  });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  let tabContent;
  if (searchParams.tab === "current") {
    tabContent = (
      <ReservationsClient
        reservations={currentReservations}
        useAction={true}
        currentUser={currentUser}
      />
    );
  } else if (searchParams.tab === "history") {
    tabContent = (
      <ReservationsClient
        reservations={historyReservation}
        useAction={false}
        currentUser={currentUser}
      />
    );
  } else if (searchParams.tab === "favorites") {
    tabContent = (
      <FavoritesClient
        accommodations={favoriteAccommodations}
        currentUser={currentUser}
      />
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="mb-10">
          <Heading title="Welcome" />
        </div>
        <h1 className="text-xl font-bold mb-5">Your reservations</h1>
        <NavHistory />
        <div className="my-5">{tabContent}</div>
      </Container>
    </ClientOnly>
  );
};

export default Search;

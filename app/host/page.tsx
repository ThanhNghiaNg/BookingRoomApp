import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import ClientOnly from "../components/ClientOnly";

import HelpClient from "./HelpClient";
import NavHistory from "./NavHistory";
import EmptyState from "../components/EmptyState";
import ContentComponent from "./Content";
import { SafeAccommodation } from "../types";
import getFavoriteAccommodations from "../actions/getFavoriteAccommodations";
import getAccommodation from "../actions/getAccommodation";

interface SearchProps {
  searchParams: { tab: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const currentUser = await getCurrentUser();
  const favoriteAccommodations: SafeAccommodation[] =
    await getFavoriteAccommodations();
  const accommodation = await getAccommodation({
    userId: currentUser?.id,
  });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <ContentComponent
          tabName={searchParams?.tab}
          currentUser={currentUser}
          favoriteAccommodations={favoriteAccommodations}
          accommodation={accommodation}
        />
      </Container>
    </ClientOnly>
  );
};

export default Search;

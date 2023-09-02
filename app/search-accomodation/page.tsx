import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import SearchAccommodationClient from "./SearchAccommodationClient";
import getAccommodations from "../actions/getAccomodations";
import getAccommodationFilters, {
  IAccommodationFilter,
} from "../actions/getAccomodationFilters";
import { IAccommodationParams } from "../actions/getAccommodation";
import ScrollToTop from "../components/scrollToTop";
// import ClientOnly from "./components/ClientOnly";

export interface SearchProps {
  searchParams: IAccommodationParams & IAccommodationFilter;
}

export default async function Search({
  searchParams,
}: {
  searchParams: SearchProps;
}) {
  const accommodations = await getAccommodations(
    searchParams as IAccommodationParams & IAccommodationFilter
  );
  const currentUser = await getCurrentUser();
  const accommodationFilters = await getAccommodationFilters(
    searchParams as IAccommodationParams & IAccommodationFilter
  );

  return (
    <ClientOnly>
      <ScrollToTop />
      <SearchAccommodationClient
        accommodationsProps={accommodations}
        filtersProps={accommodationFilters}
        currentUser={currentUser}
        searchParams={searchParams}
      />
    </ClientOnly>
  );
}

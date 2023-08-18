import { SafeAccommodation, SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoritesClientProps {
  accommodation: SafeAccommodation[];
  currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  accommodation,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {accommodation.map((accommodation: any) => (
          <ListingCard
            currentUser={currentUser}
            key={accommodation.id}
            data={accommodation}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;

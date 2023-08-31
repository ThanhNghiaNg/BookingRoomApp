import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import getAccommodation, {
  IAccommodationParams,
} from "./actions/getAccommodation";
import HomeHero from "./components/hero/HomeHero";
import ListingHotel from "./components/listings/ListingHotel";
import IntroductionBanner from "./components/banner/IntroductionBanner";
import ServicesBanner from "./components/banner/ServicesBanner";
import GetStartedBanner from "./components/banner/GetStartedBanner";
import { SafeUser } from "./types";
import Search from "./components/navbar/Search";
import ScrollAnimation from "./components/navbar/ScrollAnimation";
import ParallaxHome from "./components/hero/ParallaxHome";
import Recommendation from "./components/recommendation/Recommendation";
import HobbiesModal from "./components/modals/HobbiesModal";
import getUserPersonal from "./actions/getPersonal";

interface HomeProps {
  searchParams: IAccommodationParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  // const accommodation = await getAccommodation(searchParams);
  // const currentUser = await getCurrentUser();
  // const userPersonal = await getUserPersonal(currentUser?.id);
  const accommodation: any[] = [];
  const currentUser = null as any;
  const userPersonal = null as any;

  if (accommodation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <Container>
      <div className="relative">
        <div className="fixed z-20">
          <ScrollAnimation />
        </div>
        <ParallaxHome />

        <ServicesBanner />

        <ListingHotel
          text="The Popular Hotels"
          subtext="Enjoying your vacation with best hotels"
          type="popular"
          btnText="Find More"
          data={accommodation}
          btnHref=""
          currentUser={currentUser as SafeUser}
        />

        {/* <ClientOnly>
          <Recommendation
            currentUser={currentUser}
            userPersonal={userPersonal}
          />
        </ClientOnly> */}

        {/* <div className="order-first mb-10 md:order-last md:col-span-3"> */}

        <IntroductionBanner />

        <ListingHotel
          text="Explore Vietnam"
          subtext="These popular destinations have a lot to offer"
          type="explore"
          btnHref=""
        />

        <ListingHotel
          text="Trending Destination"
          subtext="The most popular choices for travelers from Vietnam"
          type="trending"
          btnHref=""
        />

        <ListingHotel
          text="The Luxury Hotels"
          subtext="Enjoying your vacation with best hotels"
          type="luxury"
          data={accommodation}
          btnHref=""
        />

        <GetStartedBanner />
        {/* <ClientOnly>
          <HobbiesModal currentUser={currentUser} userPersonal={userPersonal} />
        </ClientOnly> */}
      </div>
    </Container>
  );
};

export default Home;

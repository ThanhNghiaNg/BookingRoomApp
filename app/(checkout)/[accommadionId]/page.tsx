import { useRouter } from "next/navigation";
import getCurrentUser from "../../actions/getCurrentUser";
import Container from "../../components/Container";
import ListingCard from "../../components/listings/ListingCard";
import getAccommodation from "../../actions/getAccommodation";
import getAccomodationById from "../../actions/getAccomodationById";
import PaymentOption from "./paymentOption";
import ClientOnly from "../../components/ClientOnly";
import Image from "next/image";
import CalendarRange from "./calendar";
import ListingReservation from "../../components/listings/ListingReservation";
import getReservations from "../../actions/getReservations";
import CalendarZone from "./calendar";
import Input from "../../components/inputs/Input";
import ConfirmInfo from "./confirmInfo";
import { FieldValues } from "react-hook-form";

interface Props {
  searchParams: {
    accommodationId: string;
    endDate: Date;
    startDate: Date;
    totalPrice: number;
  };
}

async function ConfirmPage({ searchParams }: Props) {
  const accommodation = await getAccomodationById({
    accommodationId: searchParams.accommodationId,
  });

  const currentUser = await getCurrentUser();

  const reservations = await getReservations({
    userId: currentUser?.id,
    accommodationId: accommodation?.id,
  });

  // const accommodationIdString = accommodationId as string;
  // const accommodation = await getAccomodationById({
  //   accommodationId: accommodationIdString,
  // });

  return (
    <Container>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex-1">
          {/* <div className="flex">
              <Image
                width={500}
                height={500}
                src={accommodation?.image || ""}
                alt=" random imgee"
                className="bg-cover bg-bottom border w-full md:w-1/2 h-64 md:h-auto relative rounded-lg shadow-md"
              />
              <div>
                <div className="relative w-full ">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-baseline">
                      <div className="text-gray-600 uppercase text-xs font-semibold tracking-wider">
                        {accommodation?.bathrooms} bathrooms &bull;{" "}
                        {accommodation?.beds} beds &bull; {accommodation?.guest}{" "}
                        guest
                      </div>
                    </div>

                    <h2 className="text-teal-600 text-md font-semibold">
                      {accommodation?.address} - {accommodation?.area}
                    </h2>
                    <div>
                      <h4 className="mt-4 text-xl font-semibold uppercase leading-tight truncate">
                        {accommodation?.title}
                      </h4>
                      <span className="text-sm text-gray-600 mt-3">
                        {accommodation?.accommodationType}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-col">
                      <span className="text-sm text-gray-600 mt-3">
                        Tiên ích nổi bật:
                      </span>
                      <div className="flex flex-wrap mt-3">
                        {accommodation?.convenient
                          .slice(0, 3)
                          .map((item: any) => (
                            <span
                              key={item + 1}
                              className="mr-4 bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide pl-2"
                            >
                              {item}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          <div className="relative">
            <figure>
              <div
                className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          "
              >
                <Image
                  fill
                  className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
                  src={accommodation?.image || ""}
                  alt="Listing"
                />
              </div>
            </figure>
            <div className="absolute top-0 left-0 w-full h-full ">
              <div
                className="bg-white opacity-90 absolute top-0 left-0 right-0"
                style={{
                  height: "10%",
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2))",
                }}
              />
              <div
                className="bg-white opacity-90 absolute bottom-0 left-0 right-0"
                style={{
                  height: "10%",
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2))",
                }}
              />
            </div>
            <div className="absolute grid top-0 left-0 w-full h-full p-6 ">
              {/* Các thông tin */}
              <div className="flex flex-row justify-between">
                <div>
                  <h4 className="text-xl font-semibold uppercase leading-tight truncate text-[#fafaf9]">
                    {accommodation?.title}
                  </h4>
                  <span className="text-sm text-[#fafaf9] mt-3">
                    {accommodation?.accommodationType}
                  </span>
                </div>

                <div>
                  <h2 className="text-[#fafaf9] text-md font-semibold">
                    {accommodation?.address} - {accommodation?.area}
                  </h2>
                  <div className="flex items-baseline">
                    <div className="text-[#fafaf9] uppercase text-xs font-semibold tracking-wider">
                      {accommodation?.bathrooms} bathrooms &bull;{" "}
                      {accommodation?.beds} beds &bull; {accommodation?.guest}{" "}
                      guest
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bottom-0 justify-end ">
                <span className="text-sm text-[#fafaf9]">
                  Tiên ích nổi bật:
                </span>
                <div className="flex flex-wrap">
                  {accommodation?.convenient.slice(0, 5).map((item: any) => (
                    <span
                      key={item + 1}
                      className="mr-4 mt-2 bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide pl-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <div className="card-body">
            <h2 className="card-title">Thông tin cá nhân</h2>
            <ClientOnly>
              <ConfirmInfo
                date={{
                  startDate: searchParams.startDate,
                  endDate: searchParams.endDate,
                }}
                id={searchParams.accommodationId}
                price={accommodation?.pricesPerDate || 0}
                currentUser={currentUser}
                reservations={reservations}
                imageAccommodationUrl={accommodation?.image}
                accommodationTitle={accommodation?.title}
                hostRoom={accommodation?.userId}
              />
            </ClientOnly>
          </div>
          <ClientOnly>
            {/* <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  id={searchParams.accommodationId}
                  price={accommodation?.pricesPerDate || 0}
                  currentUser={currentUser}
                  reservations={reservations}
                />
              </div> */}
          </ClientOnly>
        </div>
      </div>
    </Container>
  );
}

export default ConfirmPage;

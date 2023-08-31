import getAccomodationById from "@/app/actions/getAccomodationById";
import ClientOnly from "@/app/components/ClientOnly";
import AboutYourPlacePage from "@/app/createroom/about/page";

interface IParams {
  accommodationId: string;
}

const EditPage = async ({ params }: { params: IParams }) => {
  console.log({ params });
  const accommodation = await getAccomodationById({
    accommodationId: params.accommodationId,
  });
  return (
    <ClientOnly>
      <AboutYourPlacePage edit={true} accommodationInfo={accommodation} />
    </ClientOnly>
  );
};

export default EditPage;

import Image from "next/image";
import "./ServiceBanner.css";

//import serviceBanner assets
import earthIcon from "../../../public/images/servicesbanner/earthIcon.png";
import bagIcon from "../../../public/images/servicesbanner/bagIcon.png";
import atmIcon from "../../../public/images/servicesbanner/atmIcon.png";

const ServicesBanner = () => {
  return (
    <div className="relative flex mt-[100px] gap-4 ServicesBanner">
      <div className="flex-col flex-1">
        <h5 className="font-bold uppercase text-primary">what we serve</h5>
        <h1 className="my-4 font-extrabold xl:text-4xl md:text-3xl">
          Top Values <br /> For You
        </h1>
        <h3>
          Try a variety of benefits when
          <br /> using our services.
        </h3>
      </div>
      <div className="flex-col flex-1">
        <Image
          src="/images/ServicesBanner/earthIcon.png"
          alt="banner"
          width="100"
          height="100"
          className="floatedImage"
        />
        <h1 className="my-4 text-2xl font-bold">Lots of Choices</h1>
        <h3>Countless Lodging Options Across Vietnam</h3>
      </div>
      <div className="flex-col flex-1">
        <Image
          src="/images/ServicesBanner/bagIcon.png"
          alt="banner"
          width="100"
          height="100"
          className="floatedImage"
        />
        <h1 className="my-4 text-2xl font-bold">Best Price</h1>
        <h3>Reasonable prices from low to high.</h3>
      </div>
      <div className="flex-col flex-1">
        <Image
          src="/images/ServicesBanner/atmIcon.png"
          alt="banner"
          width="100"
          height="100"
          className="floatedImage"
        />
        <h1 className="my-4 text-2xl font-bold">Effortless Reservations</h1>
        <h3>Seamless Booking Powered by Artificial Intelligence</h3>
      </div>
    </div>
  );
};

export default ServicesBanner;

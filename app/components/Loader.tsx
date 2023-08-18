import Image from "next/image";
import PlaneAnimation from "../../public/gifs/paper-airplan.gif";
const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <Image
        src={PlaneAnimation}
        alt="Plane Gif"
        className="text-center w-[150px] h-[150px]"
      />
    </div>
  );
};

export default Loader;

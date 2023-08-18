"use client";

const parrallax = {
  backgroundImage: `url("https://wallpapers.com/images/hd/relaxing-hotel-pool-9h27swd6cb8wj1fe.jpg")`,
  height: "680px",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
};

const VideoParallax = {
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
};

const IntroductionBanner = () => {
  return (
    <div className="flex mt-[100px]">
      <div className="relative block w-full h-full">
        {/* <div style={parrallax}></div> */}

        <div className="relative w-full h-[680px] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="absolute object-cover"
            style={VideoParallax}
          >
            <source
              src="https://res.cloudinary.com/dqrm0sqsu/video/upload/v1691732845/seaVideo_rivw4r.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="absolute top-0 right-[0px] flex items-center bg-dark bottom-0 bg-opacity-30">
          <p className="p-8 text-4xl font-bold text-light capitalize tracking-wide leading-relaxed">
            Easily find your <br /> Favorite Hotel <br /> with travel nest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionBanner;

"use client";

import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import { Image as Img } from "antd";

interface ListingImageProps {
  images: string[];
}

const ListingImage: React.FC<ListingImageProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const handleClickImage = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2 mb-4 text-xl font-semibold ">
          Hình ảnh về nơi này
        </div>
        <div className="grid items-center justify-center grid-cols-2 gap-3">
          <Image
            src={images[0]}
            width={0}
            height={0}
            sizes="100vw"
            className={`object-cover w-full h-[350px] rounded-lg shadow-lg hover:opacity-80 cursor-pointer ${
              images.length < 4 && "col-span-2"
            }`}
            alt="Hinh 0"
            onClick={handleClickImage}
          />
          {images.length > 3 && (
            <div className="grid grid-rows-2 gap-3">
              <Image
                src={images[1] ? images[1] : "/public/images/placeholder.jpg"}
                width={0}
                height={0}
                sizes="100vw"
                className="object-cover w-full h-[350px] rounded-lg shadow-lg cursor-pointer hover:opacity-80"
                alt="Hinh 1"
                onClick={handleClickImage}
              />
              <div className="relative object-cover w-full rounded-lg shadow-lg">
                <Image
                  src={images[2] ? images[2] : "/public/images/placeholder.jpg"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-cover  w-full h-[350px]  rounded-lg shadow-lg "
                  alt="Hinh 2"
                />
                {images.length > 3 && (
                  <div
                    onClick={handleClickImage}
                    className="absolute top-0 bottom-0 left-0 right-0 bg-black rounded-lg shadow-lg cursor-pointer bg-opacity-40 hover:bg-opacity-30 "
                  >
                    <span className="flex items-center justify-center h-full text-4xl text-white">
                      {`+ ${images.length - 3}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={"60vw"}
        footer={<></>}
      >
        <div className="grid grid-cols-1 mx-48 mt-12">
          {images.map((item, index) => {
            return (
              <div key={item} className="object-cover col-span-1 mt-2">
                <Img
                  width={"100%"}
                  className="w-full"
                  src={item}
                  alt={`Hinh ${index + 1}`}
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default ListingImage;

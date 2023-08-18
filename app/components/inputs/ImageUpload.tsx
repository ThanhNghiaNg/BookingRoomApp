"use client";

import { Image } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "m1mwhwfa";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <>
            <div
              className="flex border-dashed items-center badge badge-secondary badge-outline "
              onClick={() => open?.()}
            >
              <div className="font-semibold text-lg m-3 p-3 cursor-pointer hover:opacity-70 transition">
                {value ? "Click to change image" : "Click to upload"}
              </div>
            </div>
            {value && (
              <div className="m-8 shadow-lg border-dashed border-2 p-1 flex justify-center">
                <Image
                  style={{ objectFit: "contain" }}
                  src={value}
                  alt="House"
                  width={500}
                  height={500}
                />
              </div>
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

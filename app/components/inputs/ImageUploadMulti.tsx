import { useState, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "m1mwhwfa";

interface ImageUploadProps {
  onChange: (value: string) => void;
}

const ImageUploadMulti: React.FC<ImageUploadProps> = ({ onChange }) => {
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
        maxFiles: 4,
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
                Click to upload
              </div>
            </div>
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploadMulti;

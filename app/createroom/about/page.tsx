"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useMemo, useEffect } from "react";
import StepPage from "./stepPage";
import Heading from "@/app/components/Heading";
import { categories } from "@/app/components/navbar/Categories";
import CategoryBox from "@/app/components/inputs/CategoryInput";
import { accommodation_type } from "@/data/AccommodationType";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Input from "@/app/components/inputs/Input";
import Counter from "@/app/components/inputs/Counter";
import { feature_list } from "@/data/Featured";
import { convenient_list } from "@/data/convenient";
import { CategoryBoxMulti } from "@/app/components/inputs/CategoryBoxMulti";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import ImageUploadMulti from "@/app/components/inputs/ImageUploadMulti";
import { useRouter } from "next/navigation";
import { Image } from "antd";

enum STEPS {
  BASE = -1,
  PROPERTIES = 4,
  ACCOMMONDATIONTYPE = 2,
  LOCATION = 7,
  INFOROOMS = 3,
  LABEL = 0,
  IMAGES = 1,
  TITLE = 5,
  DESCRIPTION = 6,
  PRICE = 8,
}

const initInfo = {
  properties: "",
  accommodationType: null,
  // location: null,
  area: "",
  address: "",
  beds: 1,
  rooms: 1,
  guest: 1,
  bathrooms: 1,
  convenient: [],
  featured: [],
  image: "",
  detailImage: [],
  title: "",
  detailDescription: "",
  pricesPerDate: "",
};

type PageProps = {
  edit?: boolean;
  accommodationInfo?: any;
};
const AboutYourPlacePage = ({ edit, accommodationInfo }: PageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.BASE);

  const [selectedValuesFeature, setSelectedValuesFeature] = useState<string[]>(
    []
  );

  const [selectedValuesConvenient, setSelectedValuesConvenient] = useState<
    string[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      ...initInfo,
    },
  });

  const properties = watch("properties");
  const address = watch("address");
  const accommodationType = watch("accommodationType");
  const location = watch("location");
  const area = watch("area");
  const beds = watch("beds");
  const rooms = watch("rooms");
  const guest = watch("guest");
  const bathrooms = watch("bathrooms");
  const featured = watch("featured");
  const convenient = watch("convenient");
  const image = watch("image");
  const detailImage = watch("detailImage");
  const detailDescription = watch("detailDescription");
  const title = watch("title");
  const pricesPerDate = watch("pricesPerDate");

  const handleFeautureClick = (label: string, selected: boolean) => {
    let updatedSelectedValues: string[];

    if (selected) {
      updatedSelectedValues = [...selectedValuesFeature, label];
    } else {
      updatedSelectedValues = selectedValuesFeature.filter(
        (value) => value !== label
      );
    }

    setSelectedValuesFeature(updatedSelectedValues);
    setCustomValue("featured", updatedSelectedValues);
  };

  const handleConvenientClick = (label: string, selected: boolean) => {
    let updatedSelectedValues: string[];

    if (selected) {
      updatedSelectedValues = [...selectedValuesConvenient, label];
    } else {
      updatedSelectedValues = selectedValuesConvenient.filter(
        (value) => value !== label
      );
    }

    setSelectedValuesConvenient(updatedSelectedValues);
    setCustomValue("convenient", updatedSelectedValues);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    console.log({ accommodationInfo });
    axios
      .post(edit ? "/api/accommodation/update" : "/api/accommodation", {
        ...data,
        accommodationId: accommodationInfo.id,
      })
      .then(() => {
        if (edit) {
          toast.success("Listing Updated!");
          router.push(`/accommodation/${accommodationInfo.id}`);
        } else {
          router.push("/");
          toast.success("Listing created!");
          router.refresh();
          reset();
          setStep(STEPS.BASE);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return edit ? "Update" : "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        ssr: false,
      }),
    [location]
  );

  useEffect(() => {
    for (const key in accommodationInfo) {
      if (key === "detailPictures") {
        setCustomValue("detailImage", accommodationInfo[key]);
      } else {
        setCustomValue(key, accommodationInfo[key]);
      }
    }
    if (edit) setStep(STEPS.LABEL);
  }, [edit, accommodationInfo]);

  let bodyContent = (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Bước 1:</h1>
          <h2 className="text-xl font-bold mb-4">
            Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi
          </h2>
          <text className="text-lg mb-4">
            Trong bước này, chúng tôi sẽ hỏi xem bạn cho thuê loại chỗ ở nào và
            bạn muốn cho khách đặt toàn bộ nhà hay chỉ một phòng cụ thể. Sau đó,
            hãy cho chúng tôi biết vị trí và số lượng khách có thể ở tại đó.
          </text>
        </div>
      </div>
      <div className="flex justify-end">
        <video
          autoPlay
          muted
          className="w-auto min-w-full min-h-full max-w-none"
        >
          <source
            src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );

  if (step === STEPS.PROPERTIES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Đâu là dạng chỗ lưu trú bạn muốn cho thuê"
          subtitle="Hãy chọn một trong số những dạng chỗ ở dưới đây"
        />
        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-3
        overflow-y-auto
      "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryBox
                onClick={(properties) =>
                  setCustomValue("properties", properties)
                }
                selected={properties === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.ACCOMMONDATIONTYPE) {
    bodyContent = (
      <div className="flex flex-col items-center">
        <Heading
          title="Khách sẽ được sử dụng loại chỗ ở nào?"
          subtitle="Hãy chọn một trong số những dạng chỗ ở dưới đây"
        />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 overflow-y-auto">
          {accommodation_type.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryBox
                onClick={(accommodationType) =>
                  setCustomValue("accommodationType", accommodationType)
                }
                selected={accommodationType === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Xác nhận địa chỉ của bạn"
          subtitle="Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành công.
          "
        />
        <Input
          id="address"
          label="Địa chỉ"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="area"
          label="Thành phố hoặc Tỉnh"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        {/* <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        /> */}
        <Map address={address} area={area} />
      </div>
    );
  }

  if (step === STEPS.INFOROOMS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Chia sẻ một số thông tin cơ bản về chỗ ở của bạn"
          subtitle="Sau này, bạn sẽ bổ sung những thông tin khác, như loại giường chẳng hạn."
        />
        <Counter
          onChange={(value) => setCustomValue("beds", value)}
          value={beds}
          title="Giường"
          subtitle="Số giường có trong chỗ ở"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("rooms", value)}
          value={rooms}
          title="Phòng ngủ"
          subtitle="Số phòng ngủ hiện có"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("guest", value)}
          value={guest}
          title="Khách"
          subtitle="Số khách tối đa có thể chứa"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathrooms", value)}
          value={bathrooms}
          title="Phòng tắm"
          subtitle="Số phòng tắm hiện có"
        />
      </div>
    );
  }

  if (step === STEPS.LABEL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Cho khách biết chỗ ở của bạn có những gì"
          subtitle="Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê."
        />
        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-3
        overflow-y-auto
      "
        >
          {convenient_list.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryBoxMulti
                onClick={handleConvenientClick}
                selected={convenient.includes(item.label)}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
        <Heading
          title=""
          subtitle="Bạn có tiện nghi hoặc đặc điểm nào nổi bật không?."
        />
        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-3
        overflow-y-auto
      "
        >
          {feature_list.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryBoxMulti
                onClick={handleFeautureClick}
                selected={featured.includes(item.label)}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const [detailPictures, setDetailPictures] = useState<string[]>([]);

  const handleImageChange = (value: string) => {
    setDetailPictures((prevPictures) => [...prevPictures, value]);
  };

  const handleImageDelete = (index: number) => {
    setDetailPictures((prevPictures) => {
      const newPictures = [...prevPictures];
      newPictures.splice(index, 1);
      return newPictures;
    });
  };

  useEffect(() => {
    setCustomValue("detailImage", detailPictures);
  }, [detailPictures]);

  // setCustomValue("detailImage", detailPictures);

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="Chọn ảnh làm đại hiện cho chổ ở của bạn"
            subtitle="Chọn 1 bức ảnh mà bạn thấy đẹp nhất (bắt buộc)"
          />
          <ImageUpload
            onChange={(value) => setCustomValue("image", value)}
            value={image}
          />
        </div>
        <div className="flex flex-col gap-8 pt-8">
          <Heading
            title="Chọn ảnh miêu tả về chỗ ở của bạn"
            subtitle="Chọn tối đa 4 bức ảnh"
          />
          <ImageUploadMulti onChange={handleImageChange} />
          <div className="flex flex-wrap justify-center">
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {detailPictures.map((picture, index) => (
                <div
                  className="m-8 shadow-lg border-dashed border-2 p-1"
                  key={index}
                >
                  <div className="relative">
                    <Image
                      style={{ objectFit: "contain" }}
                      src={picture}
                      alt="House"
                      width={500}
                      height={500}
                    />
                    <button
                      onClick={() => handleImageDelete(index)}
                      className="absolute z-10 top-2 right-2 px-2 py-1 text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
      </>
    );
  }

  if (step === STEPS.TITLE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Bây giờ, hãy đặt tiêu đề cho chỗ ở thuộc danh mục nhà của bạn?"
          subtitle="Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tiêu đề sau."
        />
        <Input
          id="title"
          label="Tiêu đề"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tạo phần mô tả"
          subtitle="Chia sẻ những điều tạo nên nét đặc biệt cho chỗ ở của bạn."
        />
        <Input
          id="detailDescription"
          label="Thông tin chi tiết"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="pricesPerDate"
          label="Giá theo ngày"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <StepPage
      disabled={isLoading}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.BASE ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default AboutYourPlacePage;

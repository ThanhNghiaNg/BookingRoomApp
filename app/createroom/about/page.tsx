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
import Modal from "@/app/components/modals/Modal";
import { useConfirmOwnerModal } from "@/app/hooks/useConfrimModal";

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

const bodyContentModal = (
  <div className="flex flex-col justify-center items-center">
    <text className="text-black font-bold mt-5">Knock knock</text>
    <text className="text-center text-gray-500 font-semibold mt-4">
      You have fully described your accommodation
    </text>
    <text className="text-center text-gray-500 font-semibold mt-4">
      Because we want to make sure you give the best description of the place
      you want to rent
    </text>
  </div>
);

const AboutYourPlacePage = ({ edit, accommodationInfo }: PageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.BASE);

  const confirmOwnerModal = useConfirmOwnerModal();

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

  const handleConfirmModal = () => {
    confirmOwnerModal.onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    if (step == STEPS.PRICE) {
      confirmOwnerModal.onOpen();
    }

    setIsLoading(true);
    console.log(accommodationInfo);
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
          <h1 className="text-4xl font-bold mb-4 text-orange-700">
            Start to become a room owner for rent:
          </h1>
          <h2 className="text-xl font-bold mb-4">
            Share information about your accommodation with us
          </h2>
          <text className="text-lg mb-4">
            In this step, we will ask if you are renting out what type of
            accommodation and whether you want guests to book the entire house
            or just a specific room. Then, please let us know the location and
            the number of guests that can stay there
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
          title="What type of accommodation do you want to rent?"
          subtitle="Choose from one of the accommodation options below"
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
          title="What kind of accommodation will guests be able to use?"
          subtitle="Choose from one of the accommodation options below"
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
          title="Confirm your address"
          subtitle="Your address is only shared with guests after they have successfully booked."
        />
        <Input
          id="address"
          label="Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="area"
          label="City or Province"
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
          title="Share some basic information about your accommodation"
          subtitle="Later, you will add other information, like bed type, for example."
        />
        <Counter
          onChange={(value) => setCustomValue("beds", value)}
          value={beds}
          title="Bed"
          subtitle="Number of beds available in the accommodation"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("rooms", value)}
          value={rooms}
          title="Bedroom"
          subtitle="Number of bedrooms available"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("guest", value)}
          value={guest}
          title="Guest"
          subtitle="Maximum number of guests that can accommodate"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathrooms", value)}
          value={bathrooms}
          title="Bathroom"
          subtitle="Number of available bathrooms"
        />
      </div>
    );
  }

  if (step === STEPS.LABEL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Let guests know what your accommodation has"
          subtitle="You can add amenities after you list your rental"
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
          subtitle="Do you have any amenities or features that stand out?"
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
            title="Choose a photo to represent your place"
            subtitle="Choose 1 photo that you think looks best (required)"
          />
          <ImageUpload
            onChange={(value) => setCustomValue("image", value)}
            value={image}
          />
        </div>
        <div className="flex flex-col gap-8 pt-8">
          <Heading
            title="Choose a photo that describes your accommodation"
            subtitle="Select up to 4 photos"
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
          title="Now, title your home category accommodation?"
          subtitle="Short titles for best results. Don't worry, you can always change the title later."
        />
        <Input
          id="title"
          label="Title"
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
          title="Create description"
          subtitle="Share what makes your property special."
        />
        <Input
          id="detailDescription"
          label="Description"
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
          label="Price per day"
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
    <>
      <StepPage
        disabled={isLoading}
        actionLabel={actionLabel}
        onSubmit={handleSubmit(onSubmit)}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.BASE ? undefined : onBack}
        body={bodyContent}
      />
    </>
  );
};

export default AboutYourPlacePage;

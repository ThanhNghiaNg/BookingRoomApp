"use client";

import useHobbiesModal from "@/app/hooks/useHobbies";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/app/types";
import RangeSlider from "../RangeSlider";
import GenderRadio from "../GenderRadio";
import MultiSelectCombobox from "../MultiSelectCombobox";
import { VietNamLocations } from "@/data/VietNam_data";

interface Props {
  currentUser?: SafeUser | null;
}

enum STEPS {
  BASE = -1,
  AGE = 0,
  LOCATION = 1,
  SEARCH = 2,
  HOBBIES = 3,
  REQUIREMENT = 4,
  FINAL = 5,
}

const HobbiesModal: React.FC<Props> = ({ currentUser }) => {
  const hobbiesModal = useHobbiesModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      age: [],
      gender: "",
      locationWish: "",
      roomCategory: "",
      rentalType: "",
      amenities: [],
      specialFeatures: [],
    },
  });

  const age = watch("age");
  const locationWish = watch("locationWish");
  const roomCategory = watch("roomCategory");
  const rentalType = watch("rentalType");
  const amenities = watch("amenities");
  const specialFeatures = watch("specialFeatures");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.FINAL) {
      return onNext();
    }
  };

  useEffect(() => {
    // Show the modal after 5 seconds (5000 milliseconds)
    const timeout = setTimeout(() => {
      if (!currentUser?.isHaveHobbies) {
        hobbiesModal.onOpen();
      }
    }, 5000);

    return () => {
      // Clean up the timeout on component unmount
      clearTimeout(timeout);
    };
  }, []);

  const [close, setClose] = useState(false);

  const alter = () => {
    <div className="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>we use cookies for no reason.</span>
      <div>
        <button className="btn btn-sm" onClick={() => setClose(false)}>
          Deny
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setClose(true)}
        >
          Accept
        </button>
      </div>
    </div>;
  };

  const [ageRange, setAgeRange] = useState<[number, number]>([0, 18]);

  const handleSliderChange = (ageRange: [number, number]) => {
    setAgeRange(ageRange);
  };

  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleLocationChange = (selectedLocations: any) => {
    // Truy xuất giá trị được chọn ngược ra ở đây
    console.log("Selected Locations:", selectedLocations);
  };

  const handleClose = () => {
    close && hobbiesModal.onClose();
  };

  const [step, setStep] = useState(STEPS.BASE);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex items-center">
        <div>
          <h2 className="text-xl font-bold mb-4">
            Chia sẻ thông tin về sở thích của bạn cho chúng tôi
          </h2>
          <text className="text-lg mb-4">
            Trong bước này, chúng tôi mong muốn biết được sỡ thích và quan tâm
            của bạn về các địa điểm cũng như tiện ích ở nơi mà bạn muốn đến.
            Đừng ngầng ngại chia sẽ với chúng tôi nhé.
          </text>
        </div>
      </div>
    </div>
  );

  if (step === STEPS.AGE) {
    bodyContent = (
      <>
        <div>
          <RangeSlider onChange={handleSliderChange} />
          <p>
            Age Range: {ageRange[0]} - {ageRange[1]}
          </p>
        </div>
        <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Choose Your Gender</h2>
          <GenderRadio onChange={handleGenderChange} />
        </div>
      </>
    );
  }

  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div>
        <h1>Select Multiple Locations</h1>
        <MultiSelectCombobox
          locations={VietNamLocations}
          onChange={handleLocationChange}
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={hobbiesModal.isOpen}
      title="Chờ một chút"
      actionLabel="Continue"
      onClose={hobbiesModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.BASE ? undefined : onBack}
      body={bodyContent}
      width={"w-[800px]"}
    />
  );
};

export default HobbiesModal;

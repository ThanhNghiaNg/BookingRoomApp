"use client";

import useHobbiesModal from "@/app/hooks/useHobbies";
import isUserLoginModal from "@/app/hooks/useIsLogin";
import useRecommendModal from "@/app/hooks/useRecommend";
import { SafeAccommodation, SafePersonal, SafeUser } from "@/app/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import GenderRadio from "../GenderRadio";
import AgeSelection from "../recommendation/AgeSelection";
import HobbyCheckbox, {
  HOBBY_OPTION_DATA,
} from "../recommendation/HobbyCheckBox";
import MyModal from "./HobbyModal";

interface Props {
  currentUser?: SafeUser | null;
  userPersonal?: SafePersonal;
  accommodation?: SafeAccommodation[];
}

enum STEPS {
  BASE = 0,
  HOBBIES = 1,
  // LOCATION = 2,
  FINAL = 2,
  HOBBY_ONLY = 99,
}

const options = [
  { value: 17, label: "Duới 15" },
  { value: 17, label: "15-18" },
  { value: 19, label: "18-20" },
  { value: 23, label: "22-24" },
  { value: 27, label: "25-30" },
  { value: 33, label: "31-35" },
  { value: 37, label: "35-40" },
  { value: 43, label: "41-45" },
  { value: 47, label: "46-50" },
  { value: 53, label: "Trên 55" },
];

const HobbiesModal: React.FC<Props> = ({ currentUser, userPersonal }) => {
  const hobbiesModal = useHobbiesModal();
  const [isLoading, setIsLoading] = useState(false);

  const [hobbyData, setHobbyData] = useState(HOBBY_OPTION_DATA);

  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const { onChangeIsCall } = useRecommendModal();

  const { isLogin, onLoginSuccess } = isUserLoginModal();

  const onSubmit = (isSkip?: boolean) => {
    let hobbyData: any[] = [];

    HOBBY_OPTION_DATA?.map((item) => {
      if (item?.isChecked) {
        hobbyData = [...hobbyData, ...(item.detail || [])];
      }
    });

    hobbyData = [...(new Set(hobbyData) as any)];

    const {
      addressUser = "",
      age = 0,
      amenities = [],
      costPerNight = 0,
      image = "",
      locationWish = "",
      name = "",
      rentalType = "",
      roomCategory = "",
      gender = "",
    } = userPersonal || {};

    if (isSkip) {
      axios
        .post("/api/update-user", {
          ...{ age: 23 },
          ...(currentUser?.isHaveHobbies
            ? {
                ...(addressUser ? { addressUser } : { addressUser: "" }),
                ...(age ? { age } : { age: 0 }),
                ...(amenities ? { amenities } : { amenities: [] }),
                ...(image ? { image } : { image: "" }),
                ...(locationWish ? { locationWish } : { locationWish: "" }),
                ...(name ? { name } : { name: "" }),
                ...(rentalType ? { rentalType } : { rentalType: "" }),
                ...(roomCategory ? { roomCategory } : { roomCategory: "" }),
              }
            : {}),
          ...{ gender: selectedGender || gender },
          ...(selectedValue ? { age: selectedValue } : {}),
          specialFeatures: hobbyData,
        })
        .then(() => {
          toast.success("Registered!");
          onChangeIsCall();
          hobbiesModal.onClose();
        })
        .catch((error) => {
          toast.error(error.message);
          hobbiesModal.onClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
      hobbiesModal.onClose();

      return;
    }

    if (step === STEPS.HOBBY_ONLY) {
      axios
        .put("/api/update-user", {
          ...{ age: 23 },
          ...(currentUser?.isHaveHobbies
            ? {
                ...(addressUser ? { addressUser } : { addressUser: "" }),
                ...(selectedValue ? { age: selectedValue } : { age: 0 }),
                ...(costPerNight ? { costPerNight } : { costPerNight: 0 }),
                ...(amenities ? { amenities } : { amenities: [] }),
                ...(image ? { image } : { image: "" }),
                ...(locationWish ? { locationWish } : { locationWish: "" }),
                ...(name ? { name } : { name: "" }),
                ...(rentalType ? { rentalType } : { rentalType: "" }),
                ...(roomCategory ? { roomCategory } : { roomCategory: "" }),
              }
            : {}),
          ...{ gender: selectedGender || gender },
          ...(selectedValue ? { age: selectedValue } : {}),
          specialFeatures: hobbyData,
        })
        .then(() => {
          toast.success("Registered!");
          onChangeIsCall();
          hobbiesModal.onClose();
        })
        .catch((error) => {
          toast.error(error.message);
          hobbiesModal.onClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
      hobbiesModal.onClose();
      return;
    }

    if (step !== STEPS.FINAL) {
      return onNext();
    }

    axios
      .post("/api/update-user", {
        ...{ age: 23 },
        ...(currentUser?.isHaveHobbies
          ? {
              ...(addressUser ? { addressUser } : { addressUser: "" }),
              ...(age ? { age } : { age: 0 }),
              ...(amenities ? { amenities } : { amenities: [] }),
              ...(image ? { image } : { image: "" }),
              ...(locationWish ? { locationWish } : { locationWish: "" }),
              ...(name ? { name } : { name: "" }),
              ...(rentalType ? { rentalType } : { rentalType: "" }),
              ...(roomCategory ? { roomCategory } : { roomCategory: "" }),
            }
          : {}),
        ...{ gender: selectedGender || gender },
        ...(selectedValue ? { age: selectedValue } : {}),
        specialFeatures: hobbyData,
      })
      .then(() => {
        toast.success("Registered!");
        onChangeIsCall();
        hobbiesModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
        hobbiesModal.onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
    hobbiesModal.onClose();
  };

  useEffect(() => {
    if (isLogin && (!currentUser?.isHaveHobbies || !userPersonal)) {
      setStep(0);
      hobbiesModal.onOpen();
      return;
    }

    if (
      isLogin &&
      !!(currentUser?.isHaveHobbies && !userPersonal?.specialFeatures?.length)
    ) {
      setStep(99);
      hobbiesModal.onOpen();
    }
  }, [isLogin, userPersonal, currentUser]);

  useEffect(() => {
    if (!isLogin && currentUser) {
      onLoginSuccess();
    }
  }, [isLogin, currentUser]);

  const [step, setStep] = useState(STEPS.BASE);

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  const handleLocationChange = (selectedLocations: any) => {
    // Truy xuất giá trị được chọn ngược ra ở đây
    console.log("Selected Locations:", selectedLocations);
  };

  let bodyContent = (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="mb-4 text-xl font-bold text-center">
        Để trải nghiệm tốt nhất dành cho bạn, hãy chia sẻ thông tin và sở thích
        với chúng tớ nhé.
      </h2>
      <div className="flex flex-row items-center justify-between w-full gap-5">
        <div className="flex-1 mb-3 ">
          <AgeSelection onSelect={handleChange} optionData={options} />
        </div>
        <div className="flex-1 p-4 rounded mx-aut ">
          <h2 className="mb-4 text-2xl font-semibold text-center">
            Choose Your Gender
          </h2>
          <div className="flex flex-row items-center justify-evenly">
            <Image
              src="/images/gender.png"
              className="w-[80px] h-[80px]"
              width={80}
              height={80}
              alt="Logo"
            />
            <GenderRadio onChange={handleGenderChange} />
          </div>
        </div>
      </div>
      {/* <MultiSelectCombobox
        locations={VietNamLocations}
        onChange={handleLocationChange}
      /> */}
    </div>
  );

  if (step === 99) {
    bodyContent = (
      <div className="grid grid-cols-1 gap-10">
        <div className="flex items-center">
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Để có một trải nghiệm tốt nhất, bạn hãy cho chúng mình biết những
              gì bạn quan tâm nhé.
            </h2>
            <text className="mb-4 text-lg">
              Trong bước này, chúng tôi mong muốn biết được sỡ thích và quan tâm
              của bạn về các địa điểm cũng như tiện ích ở nơi mà bạn muốn đến.
              Đừng ngầng ngại chia sẻ với chúng tôi nhé.
            </text>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center w-3/5 pt-5 justify-self-center">
          {hobbyData?.map((item, index) => (
            <HobbyCheckbox
              key={index}
              label={item.title}
              isChecked={item.isChecked}
              index={index}
              onChange={() => {
                setHobbyData((prev) => {
                  const temp = [...prev];
                  temp[index].isChecked = !item.isChecked;
                  return temp;
                });
              }}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step == STEPS.HOBBIES) {
    bodyContent = (
      <div className="grid grid-cols-1 gap-10 max-w-[1170px]">
        <div className="flex items-center">
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Chúng tớ cần biết hiểu bạn hơn, cùng chia sẻ sở thích của bạn cho
              chúng tớ nhé.
            </h2>
            <text className="mb-4 text-lg">
              Trong bước này, chúng tớ mong muốn biết được sỡ thích và quan tâm
              của bạn về các địa điểm cũng như tiện ích ở nơi mà bạn muốn đến.
              Đừng ngầng ngại chia sẻ với chúng tớ nhé.
            </text>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5 pt-5 justify-self-center">
          {hobbyData?.map((item, index) => (
            <HobbyCheckbox
              key={index}
              label={item.title}
              isChecked={item.isChecked}
              index={index}
              onChange={() => {
                setHobbyData((prev) => {
                  const temp = [...prev];
                  temp[index].isChecked = !item.isChecked;
                  return temp;
                });
              }}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <MyModal
      isOpen={hobbiesModal.isOpen}
      title="Cùng dừng chân một chút"
      onClose={hobbiesModal.onClose}
      onNext={onSubmit}
      body={bodyContent}
      step={step}
    />
  );
};

export default HobbiesModal;

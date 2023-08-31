import React, { useState } from "react";

interface GenderRadioProps {
  onChange: (gender: string) => void;
}

const GenderRadio: React.FC<GenderRadioProps> = ({ onChange }) => {
  const [gender, setGender] = useState<string>("");

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    onChange(selectedGender);
  };

  return (
    <div>
      <div className="w-[100px] flex justify-start items-center flex-row ">
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={handleGenderChange}
          className="mr-4 radio radio-success"
        />
        <label htmlFor="male">Male</label>
      </div>

      <div className="w-[100px] flex justify-start items-center flex-row mt-3 mb-3">
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={handleGenderChange}
          className="mr-4 radio radio-success"
        />
        <label htmlFor="female">Female</label>
      </div>

      <div className="w-[100px] flex justify-start items-center flex-row ">
        <input
          type="radio"
          name="gender"
          value="other"
          checked={gender === "other"}
          onChange={handleGenderChange}
          className="mr-4 radio radio-success"
        />
        <label htmlFor="other">Other</label>
      </div>
    </div>
  );
};

export default GenderRadio;

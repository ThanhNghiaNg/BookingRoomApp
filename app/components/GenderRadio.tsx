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
      <div>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={handleGenderChange}
          className="radio radio-success"
        />
        <label htmlFor="male">Male</label>
      </div>

      <div>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={handleGenderChange}
          className="radio radio-success"
        />
        <label htmlFor="female">Female</label>
      </div>

      <div>
        <input
          type="radio"
          name="gender"
          value="other"
          checked={gender === "other"}
          onChange={handleGenderChange}
          className="radio radio-success"
        />
        <label htmlFor="other">Other</label>
      </div>
    </div>
  );
};

export default GenderRadio;

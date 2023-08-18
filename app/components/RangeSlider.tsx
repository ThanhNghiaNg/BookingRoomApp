import { useState } from "react";

interface RangeSliderProps {
  onChange: (ageRange: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ onChange }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(18);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setMin(value);

    // Calculate age ranges based on slider value
    if (value < 18) {
      setMax(18);
      onChange([0, 18]);
    } else if (value >= 18 && value < 25) {
      setMax(25);
      onChange([18, 25]);
    } else if (value >= 25 && value < 32) {
      setMax(32);
      onChange([25, 32]);
    } else if (value >= 32 && value < 45) {
      setMax(45);
      onChange([32, 45]);
    } else if (value >= 45 && value < 65) {
      setMax(65);
      onChange([45, 65]);
    } else {
      setMax(70);
      onChange([65, 100]);
    }
  };

  return (
    <div>
      <input
        type="range"
        min={0}
        max={70}
        value={min}
        className="range"
        step={1}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default RangeSlider;

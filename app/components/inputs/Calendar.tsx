"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../Button";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  isOpen?: boolean;
  onClick?: () => void;
  padding?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
  isOpen,
  padding,
  onClick,
  disabled,
}) => {
  return (
    <div
      className={`w-[35vw] ${
        padding ? padding : "pt-32"
      }  bg-white rounded-xl border-neutral-200
    border-[1px] shadow-2xl ${!isOpen && "hidden"} `}
    >
      <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        showDateDisplay={false}
        minDate={new Date()}
        months={2}
        disabledDates={disabledDates}
        direction="horizontal"
      />
      {onClick && (
        <div className="p-4">
          <Button
            disabled={disabled}
            onClick={onClick}
            label="OK"
            className="px-5"
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;

"use client";

import { ChangeEvent } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineAttachMoney } from "react-icons/md";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  pattern?: string;
  rules?: Partial<Record<string, any>>;
  control?: Control<FieldValues>;
  placeholder?: string;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  pattern,
  rules,
  control,
  placeholder
  // onChange,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        // onChange={onChange}
        disabled={disabled}
        {...register(id, {
          required: required && "This field is required", // Sử dụng required từ props
          pattern:
            pattern &&
            ({
              value: new RegExp(pattern),
              message: "Invalid input", // Sử dụng pattern từ props
            } as any),
          ...rules, // Truyền các rules khác từ props
        })}
        placeholder={placeholder ? placeholder : " "}
        type={type}
        className={`
          peer
          w-full
          h-auto
          p-4
          pt-6
          input
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-red-500" : "border-gray-300"}
          ${errors[id] ? "focus:border-red-500" : "focus:border-black"}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          text-md
          duration-100
          transform
          -translate-y-3
          top-5
          z-100
          origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-red-500" : "text-gray-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

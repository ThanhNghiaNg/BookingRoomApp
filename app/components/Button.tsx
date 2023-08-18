import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  fullWidth?: boolean;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  fullWidth = true,
  width,
  ...props
}) => {
  const buttonClasses = classNames(
    `inline-flex items-center justify-center rounded-lg transition ${
      fullWidth ? "w-full" : width
    }`,
    outline
      ? "bg-white border-black text-black"
      : "bg-rose-500 border-rose-500 text-white",
    small
      ? "text-sm py-1 font-light border-[1px]"
      : "text-md py-3 font-semibold border-2",
    disabled && "opacity-50",
    props.className
  );

  // const buttonClasses = `"inline-flex text-white items-center justify-center rounded-lg transition ${
  //   outline
  //     ? "bg-white border-black text-black"
  //     : "bg-rose-500 border-rose-500 text-white"
  // }" ${
  //   small
  //     ? "text-sm py-1 font-light border-[1px]"
  //     : "text-md py-3 font-semibold border-2"
  // } ${props.className}`;
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {Icon && <Icon className="mr-2" />}
      {label}
    </button>
  );
};

export default Button;

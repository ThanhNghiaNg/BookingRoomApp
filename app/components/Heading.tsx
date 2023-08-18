"use client";

import classNames from "classnames";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  const headingClasses = classNames({
    "text-center": center,
    "text-start": !center,
  });

  return (
    <div className={headingClasses}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;

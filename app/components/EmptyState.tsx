"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import Image from "next/image";
import OpsImage from "../../public/images/ops.png";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        <Image src={OpsImage} height={300} width={300} alt="ops" />
        {showReset && (
          <Button outline label="Go back" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;

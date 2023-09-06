"use client";

import Button from "@/app/components/Button";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const StepPage: React.FC<ModalProps> = ({
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  return (
    <div className="w-full h-full my-6 mx-auto lg:h-auto md:h-auto overflow-auto">
      {/*content*/}
      <div className="justify-center">
        {/*body*/}
        <div className="p-6 flex-auto justify-center">{body}</div>
        {/*footer*/}
        <div className="flex flex-col gap-2 p-6">
          {/* Step footer */}

          {/* Action buttons */}
          <div className="rounded-t-xl fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex justify-between border-t border-gray-300">
            <div>
              {/* Left button */}
              {secondaryAction && secondaryActionLabel && (
                <Button
                  width={"w-[100px]"}
                  fullWidth={false}
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                  outline
                />
              )}
            </div>
            {/* <div className="flex-1 text-center"> */}
            {/* Centered Step component */}
            {/* <ul className="steps"> */}
            {/* <li className="step step-primary">Step 1</li> */}
            {/* <li className="step step-primary">Step 1</li>
                <li className="step">Step 2</li>
                <li className="step">Step 3</li>
              </ul>
            </div> */}
            <div>
              {/* Right button */}
              <Button
                width={"w-[100px]"}
                fullWidth={false}
                disabled={disabled}
                label={actionLabel}
                onClick={handleSubmit}
              />
            </div>
          </div>
          {/* Additional footer content */}
          {footer}
        </div>
      </div>
    </div>
  );
};

export default StepPage;

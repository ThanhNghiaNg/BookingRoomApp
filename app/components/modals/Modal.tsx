import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  width?: string;
  classNameStyleTitle?: string;
  disabledSubmitButton?: boolean;
  bgColor?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  classNameStyleTitle,
  width,
  disabledSubmitButton = false,
  bgColor
}) => {
  const handleClose = () => {
    if (disabled) {
      return;
    }

    onClose();
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-50"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen p-4 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-800/70" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`${bgColor ? bgColor : 'bg-white' } rounded-lg p-6 w-full ${
                width ? width : "max-w-md"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                {classNameStyleTitle ? (
                  <Dialog.Title className={classNameStyleTitle}>
                    {title}
                  </Dialog.Title>
                ) : (
                  <Dialog.Title className="text-lg font-semibold">
                    {title}
                  </Dialog.Title>
                )}

                <button
                  className="p-1 border-0 hover:opacity-70 transition"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
              </div>

              <div className="mb-6">{body}</div>

              <div className="flex gap-2">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    small
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                {!disabledSubmitButton && (
                  <Button
                    small
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                )}
              </div>

              {footer}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

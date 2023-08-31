import { useState } from "react";
import Button from "../Button";
import { TbMoodCry } from "react-icons/tb";
import CloseIconButton from "../recommendation/CloseButton";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  onNext: (isSkip?: boolean) => void;
  step?: number;
}

const MyModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onNext,
  title = "Your modal",
  body,
  step,
}) => {
  const onSubmit = () => {
    onNext();
  };

  const [isSkip, setIsSkip] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
          <div className="absolute top-0 left-0 z-20 w-screen h-screen bg-black opacity-40"></div>
          <div
            className={
              "min-w-[600px] flex items-center z-30 flex-col bg-white p-5 rounded-lg shadow-md hover:shadow-lg focus:shadow-xl relative" +
              (isSkip ? "opacity-20" : "")
            }
          >
            <CloseIconButton onClick={onClose} />
            <h2 className="w-full text-lg font-semibold text-left">{title}</h2>
            <div className="flex items-center justify-center flex-1 pt-5 pb-5">
              {body}
            </div>

            <div className="flex flex-row items-center self-end justify-center w-1/2 gap-4">
              <Button
                className="text-center"
                outline
                label="Skip"
                onClick={() => {
                  setIsSkip(true);
                }}
              />
              <Button
                className="text-center "
                label={step === 1 ? "Thank You" : "Continue"}
                onClick={
                  step === 1
                    ? () => {
                        onNext(true);
                      }
                    : onSubmit
                }
              />
            </div>
          </div>
        </div>
      )}
      {isSkip && (
        <div
          className="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen"
          onClick={() => {
            setIsSkip(false);
          }}
        >
          <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-40" />
          <div className="z-50 flex items-center justify-start relative bg-white w-[450px] pt-8 px-5 rounded-lg flex-col h-36">
            <TbMoodCry
              size={40}
              className="absolute bottom-2 left-5"
              color="#918c4b"
            />
            <span className="w-full text-xl text-left whitespace-pre-line -translate-y-2">
              Do you want to skip this step?
            </span>
            <span className="w-full text-xl text-left whitespace-pre-line -translate-y-2">
              This step is important for your experience.
            </span>
            <div className="absolute left-0 flex flex-row items-end justify-end w-full bottom-2">
              <div className="flex flex-row items-end justify-end w-1/2 gap-2 mr-2">
                <Button
                  className="w-20 h-10 text-center"
                  outline
                  label="Cancel"
                  onClick={() => {
                    setIsSkip(false);
                  }}
                />

                <Button
                  className="w-20 h-10 text-center"
                  label="OK"
                  onClick={() => {
                    onNext(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyModal;

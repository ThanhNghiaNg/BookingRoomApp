"use client";

import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";

interface Plan {
  id:string|number;
  name: string;
  option: string;
  descrip: string;
}

interface PaymentOptionProps {
  plans: Plan[];
  value: Plan;
  onChange: (selectedPlan: Plan) => void;
}

export default function PaymentOption({
  plans,
  value,
  onChange,
}: PaymentOptionProps) {
  const [selected, setSelected] = useState(plans[0]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="w-full px-4 py-16">
      <div className="w-full">
        <RadioGroup
          value={selected}
          onChange={(plan) => {
            setSelected(plan);
            onChange(plan);
          }}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-x-5 flex">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.id}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-[48%]`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>{plan.descrip}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

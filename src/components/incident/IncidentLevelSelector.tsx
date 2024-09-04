import React from "react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";

import { FormState } from "@/types/Form";
import { levels } from "@/data/formdata";

const IncidentLevelSelector = ({
  value,
  onItemUpdate,
}: {
  value: string;
  onItemUpdate: (field: keyof FormState, value: string) => void;
}) => {
  return (
    <RadioGroup
      value={value}
      label="Рівень впливу"
      orientation="horizontal"
      classNames={{ wrapper: cn("gap-8") }}
      onValueChange={(v) => onItemUpdate("level", v)}
    >
      {levels.map((i) => (
        <Radio
          key={i.text}
          value={i.text}
          classNames={{ label: cn(`text-${i.color} capitalize`) }}
        >
          {i.text}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default IncidentLevelSelector;

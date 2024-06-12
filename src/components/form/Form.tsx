import React, { Dispatch, SetStateAction } from "react";
import { Checkbox, DateValue, Textarea, TimeInput } from "@nextui-org/react";

import LevelSelector from "@/components/form/LevelSelector";
import DatePickerCustom from "@/components/UI/DatePicker";

import CustomInput from "@/components/UI/Input";
import { FormState } from "@/types/Form";
import { convertISOToZonned, convertZonnedToDate } from "@/utils/dateHelpers";

const Form = ({
  formState: {
    level,
    theme,
    activities,
    reasons,
    isResolved,
    numberOfIncident,
    numberOfMessage,
    startDate,
    endDate,
  },
  updateFormState,
}: {
  formState: FormState;
  updateFormState: Dispatch<SetStateAction<FormState>>;
}) => {
  const onItemUpdate = (
    field: keyof FormState,
    value: string | boolean | Date
  ) => {
    updateFormState((state) => ({
      ...state,
      [field]: value,
    }));
  };
  return (
    <form className="grid gap-5">
      <LevelSelector value={level} onItemUpdate={onItemUpdate} />
      <Textarea
        label="Тема"
        placeholder="Тема повідомлення"
        value={theme}
        onValueChange={(t) => onItemUpdate("theme", t)}
      />
      <CustomInput
        label="Причини"
        value={reasons}
        onValueChange={(t) => onItemUpdate("reasons", t)}
      />
      <CustomInput
        label="Вжиті заходи"
        value={activities}
        onValueChange={(t) => onItemUpdate("activities", t)}
      />
      <Checkbox
        isSelected={isResolved}
        onValueChange={(t) => onItemUpdate("isResolved", t)}
      >
        Інцидент завершений
      </Checkbox>
      <div className="grid grid-cols-2 gap-2">
        <DatePickerCustom
          label="Час початку"
          value={convertISOToZonned(startDate)}
          onItemUpdate={(v: DateValue) =>
            onItemUpdate("startDate", convertZonnedToDate(v))
          }
        />
        <DatePickerCustom
          label="Час завершення"
          value={endDate ? convertISOToZonned(endDate) : null}
          onItemUpdate={(v: DateValue) =>
            onItemUpdate("endDate", convertZonnedToDate(v))
          }
        />
      </div>
      <div className="grid gap-4 grid-cols-3">
        <CustomInput
          type="number"
          defaultValue="1"
          label="№ повідомлення"
          value={numberOfMessage}
          onValueChange={(t) => onItemUpdate("numberOfMessage", t)}
        />
        <CustomInput
          label="Номер інциденту"
          value={numberOfIncident}
          onValueChange={(t) => onItemUpdate("numberOfIncident", t)}
        />
      </div>
    </form>
  );
};

export default Form;

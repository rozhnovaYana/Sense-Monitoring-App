import React from "react";
import {
  DatePicker,
  DatePickerProps,
  type DateValue,
  cn,
} from "@nextui-org/react";

interface DatePickerCustomProps extends DatePickerProps {
  label: string;
  onItemUpdate: (v: DateValue) => void;
}
const DatePickerCustom = ({
  label,
  onItemUpdate,
  ...props
}: DatePickerCustomProps) => {
  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DatePicker
        label={label}
        granularity="minute"
        showMonthAndYearPickers
        hideTimeZone
        onChange={(v: DateValue) => onItemUpdate(v)}
        classNames={{ base: cn("overflow-visible") }}
        disableAnimation
        {...props}
      />
    </div>
  );
};
export default DatePickerCustom;

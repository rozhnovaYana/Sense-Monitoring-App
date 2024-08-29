import { fromDate, getLocalTimeZone } from "@internationalized/date";
import { type DateValue } from "@nextui-org/react";

export const getTimeDifference = (startDate: Date, endDate: Date) => {
  const startInMS = startDate.getTime();
  const endInMS = endDate.getTime();

  const diffInMs = Math.abs(endInMS - startInMS);

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffInSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  return [
    !!diffInDays ? `${diffInDays} дн.` : null,
    !!diffInHours ? `${diffInHours} год.` : null,
    !!diffInMinutes
      ? `${(diffInMinutes += diffInSeconds > 0 ? 1 : 0)} хв.`
      : null,
  ]
    .filter(Boolean)
    .join(", ");
};

export const convertISOToZonned = (data: Date) => fromDate(data, "Europe/Kyiv");
export const convertZonnedToDate = (data: DateValue): Date =>
  data.toDate(getLocalTimeZone());

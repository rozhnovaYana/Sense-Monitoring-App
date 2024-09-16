import { type FormState, type Level } from "@/types/Form";
import { now, getLocalTimeZone } from "@internationalized/date";

import { convertZonnedToDate } from "@/utils/dateHelpers";

export const levels: Level[] = [
  {
    text: "high",
    color: "danger",
  },
  {
    text: "medium",
    color: "primary",
  },
  {
    text: "low",
    color: "success",
  },
  {
    text: "information",
    color: "foreground",
  },
];

export const FormDataInitialState: FormState = {
  level: "medium",
  theme: "Тема повідомлення",
  activities: "Залучені спеціалісти ІТ",
  reasons: "",
  isResolved: false,
  numberOfIncident: "INC-0000",
  numberOfMessage: "1",
  startDate: convertZonnedToDate(now(getLocalTimeZone())),
  endDate: null,
  telegramId: null,
  webexCSId: null,
  webexAlertId: null,
};

import { incidentKeys } from "@/types/Incident";

export const analyticsFileds = {
  startDate: "Дата",
  numberOfIncident: "Номер",
  reporter: "Репортер",
  timeRequest: "Час запиту",
  timeSend: "Час розсилки",
  user: "Черговий",
  isSLA: "isSLA",
};
export const sortDescriptors: incidentKeys[] = [
  "startDate",
  "numberOfIncident",
  "reporter",
  "user",
  "timeRequest",
  "timeSend",
];

import { User } from "@/types/User";

export type incidentKeys =
  | "timeRequest"
  | "timeSend"
  | "reporter"
  | "numberOfIncident"
  | "startDate"
  | "isSLA"
  | "user";

export type BooleanKeys = "isSLA";
export type UserKeys = "user";

export type Incident = {
  [K in incidentKeys]: K extends BooleanKeys
    ? boolean
    : K extends UserKeys
    ? User
    : string;
} & { id: number };

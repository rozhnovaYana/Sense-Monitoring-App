export type incidentKeys =
  | "timeRequest"
  | "timeSend"
  | "reporter"
  | "numberOfIncident"
  | "user"
  | "startDate"
  | "isSLA";
export type Incident = Record<incidentKeys, "string">;

export type incidentKeys =
  | "timeRequest"
  | "timeSend"
  | "reporter"
  | "numberOfIncident"
  | "user"
  | "data"
  | "isSLA";
export type Incident = Record<incidentKeys, "string">;

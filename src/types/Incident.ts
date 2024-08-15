export type incidentKeys =
  | "timeRequest"
  | "timeSend"
  | "reporter"
  | "numberOfIncident"
  | "user"
  | "startDate"
  | "isSLA";

// Окремий тип для властивостей, які мають бути boolean
export type BooleanKeys = "isSLA";

// Умовний тип для визначення типу кожної властивості
export type Incident = {
  [K in incidentKeys]: K extends BooleanKeys ? boolean : string;
} & { id: number };

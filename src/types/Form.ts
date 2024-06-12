export type LevelStatuses = "high" | "medium" | "low" | "information";

export type Level = {
  text: LevelStatuses;
  color: string;
};

export interface FormState {
  level: LevelStatuses;
  theme: string;
  activities: string;
  reasons: string;
  isResolved: boolean;
  startDate: Date;
  endDate?: Date;
  numberOfMessage: string;
  numberOfIncident: string;
  timeOfRequest?: Date;
}
export interface FormStateDB extends Omit<FormState, "startDate" | "endDate"> {
  startDate: string;
  endDate?: string;
}

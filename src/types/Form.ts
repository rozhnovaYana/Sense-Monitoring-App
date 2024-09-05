export type Level = {
  text: string;
  color: string;
};

export interface FormState {
  level: string;
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

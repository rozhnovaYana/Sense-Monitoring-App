export type createDiscussState = {
  errors: {
    _form?: string;
    content?: string[];
  };
  isSuccess?: boolean;
};

export type createIncidentState = {
  error?: string;
  message?: string;
  timeRequest?: string;
  timeSend?: string;
  reporter?: string;
  numberOfIncident?: string;
  startDate?: string;
  success: boolean;
};
export type createUserState = {
  errors: {
    name?: string[];
    login?: string[];
    role?: string[];
    _form?: string;
  };
  isSuccess?: boolean;
};

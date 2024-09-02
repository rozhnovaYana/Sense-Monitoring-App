export type createDiscussState = {
  errors: {
    _form?: string;
    content?: string[];
  };
  isSuccess?: boolean;
};

export type createIncidentState = {
  errors: {
    timeRequest?: string[];
    timeSend?: string[];
    reporter?: string[];
    numberOfIncident?: string;
    startDate?: string;
    _form?: string;
  };
  isSuccess?: boolean;
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

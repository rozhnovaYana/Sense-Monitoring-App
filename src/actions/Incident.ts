"use server";

import moment from "moment";

import { auth } from "@/auth";
import { db } from "@/db";

import { createIncidentState } from "@/types/FormStates";

import messages from "@/locales/ua.json";
import { IncidentSchema } from "./schema";

export const saveIncident = async (
  numberOfIncident: string,
  startDate: Date,
  prevState: createIncidentState,
  formdata: FormData
): Promise<createIncidentState> => {
  const session = await auth();
  const userId = session?.user?.id;

  // check if user exists and formDate is filled
  if (!userId) {
    return {
      errors: {
        _form: messages.access_denied,
      },
    };
  }
  // get data from FormData
  const reporter = formdata.get("reporter") as string;
  const timeRequest = formdata.get("timeRequest") as string;
  const timeSend = formdata.get("timeSend") as string;
  if (!numberOfIncident) {
    return {
      errors: {
        numberOfIncident: "Ви повинні вказати номер інциденту.",
      },
    };
  }
  const data = {
    reporter,
    timeRequest,
    timeSend,
  };
  const validatedData = IncidentSchema.safeParse(data);
  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }
  // SLA checker for 11 mins
  const timeFormat = "HH:mm:ss";

  const requestTime = moment(timeRequest, timeFormat);
  const sendTime = moment(timeSend, timeFormat);

  if (sendTime.isBefore(requestTime)) {
    sendTime.add(1, "day");
  }

  const diffMinutes = sendTime.diff(requestTime, "minutes");
  const isSLA = +diffMinutes <= 11;

  const date = moment(startDate).format("YYYY MM DD");

  const incident = {
    ...validatedData.data,
    numberOfIncident,
    userId,
    startDate: date,
    isSLA,
  };
  try {
    await db.incident.upsert({
      where: {
        numberOfIncident,
      },
      update: { ...incident },
      create: { ...incident },
    });

    return {
      isSuccess: true,
      errors: {},
    };
  } catch (err) {
    return {
      errors: {
        _form: messages.common_issue,
      },
    };
  }
};

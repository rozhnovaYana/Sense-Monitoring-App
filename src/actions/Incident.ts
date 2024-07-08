"use server";

import { auth } from "@/auth";
import moment from "moment";
import { db } from "@/db";

export type FormState = {
  error?: string;
  message?: string;
  timeRequest?: string;
  timeSend?: string;
  reporter?: string;
  numberOfIncident?: string;
  startDate?: string;
  success: boolean;
};

export const getIncidents = async () => {
  const incidents = await db.incident.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return incidents;
};

export const saveIncident = async (
  numberOfIncident: string,
  startDate: Date,
  prevState: FormState,
  formdata: FormData
): Promise<FormState> => {
  const session = await auth();
  try {
    // get data from FormData
    const reporter = formdata.get("reporter") as string;
    const timeRequest = formdata.get("timeRequest") as string;
    const timeSend = formdata.get("timeSend") as string;
    const user = session?.user?.name;
    // check if user exists and formDate is filled
    if (!user) {
      return {
        success: false,
        message: "Лише залогінені користувачі можуть виконувати цю дію.",
      };
    }
    if (
      !reporter ||
      !timeRequest ||
      !numberOfIncident ||
      !startDate ||
      !timeSend
    ) {
      return {
        reporter: !reporter ? "Введіть репортера" : undefined,
        timeRequest: !timeRequest ? "Заповніть поле" : undefined,
        timeSend: !timeSend ? "Заповніть поле" : undefined,
        numberOfIncident: !numberOfIncident
          ? "Введіть номер інциденту"
          : undefined,
        startDate: !startDate ? "Введіть час початку інциденту" : undefined,
        success: false,
      };
    }
    // SLA checker for 11 mins
    const timeFormat = "HH:mm:ss";
    const diffMinutes =
      typeof timeSend === "string" &&
      typeof timeRequest === "string" &&
      moment(timeSend, timeFormat).diff(
        moment(timeRequest, timeFormat),
        "minutes"
      );
    const isSLA = +diffMinutes <= 11;

    const date = moment(startDate).format("YYYY MM DD");

    const incident = {
      numberOfIncident,
      timeRequest,
      timeSend,
      reporter,
      user,
      startDate: date,
      isSLA,
    };

    await db.incident.upsert({
      where: {
        numberOfIncident: numberOfIncident,
      },
      update: { ...incident },
      create: { ...incident },
    });

    return {
      message: `Інцидент ${numberOfIncident} був успішно збережений.`,
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      success: false,
    };
  }
};

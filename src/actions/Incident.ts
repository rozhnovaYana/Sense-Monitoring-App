"use server";

import path from "path";
import fs from "fs";
import matter from "gray-matter";

import { auth } from "@/auth";
import moment from "moment";
import { Incident } from "@/types/Incident";

const limit = 10;

const filePath = path.join(process.cwd(), "src", "db", "incidents.json");
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

export const getIncidents = () => {
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(rawFile);
  return content ? JSON.parse(content) : [];
};

export const saveIncident = async (
  numberOfIncident: string,
  startDate: Date,
  prevState: FormState,
  formdata: FormData
): Promise<FormState> => {
  const session = await auth();
  try {
    // read file
    const rawFile = fs.readFileSync(filePath, "utf-8");
    const { content } = matter(rawFile);
    const fileData = content ? JSON.parse(content) : [];
    // get data from FormData
    const reporter = formdata.get("reporter");
    const timeRequest = formdata.get("timeRequest");
    const timeSend = formdata.get("timeSend");
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

    const incidentInd = fileData.findIndex(
      (el: Incident) => el.numberOfIncident === numberOfIncident
    );
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

    if (incidentInd !== -1) {
      fileData[incidentInd] = incident;
    } else {
      fileData.unshift(incident);
    }
    console.log(fileData);

    fileData?.length >= limit && fileData.pop();

    // add trim

    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
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

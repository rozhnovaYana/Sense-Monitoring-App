"use server";

import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { auth } from "@/auth";

const limit = 10;

const rootDir = "./data";
const filePath = path.join(rootDir, "incidents.json");

export type FormState = {
  error?: string;
  message?: string;
  time?: string;
  reporter?: string;
  numberOfIncident?: string;
  success: boolean;
};

export const saveIncident = async (
  numberOfIncident: string,
  prevState: FormState,
  formdata: FormData
): Promise<FormState> => {
  const session = await auth();
  console.log(session);
  try {
    const rawFile = fs.readFileSync(filePath, "utf-8");
    const { content } = matter(rawFile);
    const fileData = content ? JSON.parse(content) : [];
    fileData?.length >= limit && fileData.pop();
    const reporter = formdata.get("reporter");
    const time = formdata.get("time");
    const user = session?.user?.name;
    if (!user) {
      return {
        success: false,
        message: "Лише залогінені користувачі можуть виконувати цю дію.",
      };
    }
    if (!reporter || !time || !numberOfIncident) {
      return {
        reporter: !reporter ? "Введіть репортера" : undefined,
        time: !time ? "Заповни" : undefined,
        numberOfIncident: !numberOfIncident
          ? "Введіть номер інциденту"
          : undefined,
        success: false,
      };
    }
    const updatedData = [
      {
        numberOfIncident,
        time,
        reporter,
        user,
      },
      ...fileData,
    ];
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    return {
      message: `Інцидент ${numberOfIncident} був успішно збережений.`,
      success: true,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      success: false,
    };
  }
};

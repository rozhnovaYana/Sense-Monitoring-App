"use server";

import path from "path";
import fs from "fs";
import { FormStateDB } from "@/types/Form";
import { db } from "@/db";

const limit = 10;

const rootDir = "src/db/";
const filePath = path.join(rootDir, "messages.json");

export const getMessages = async () => {
  const messages = await db.message.findMany();
  console.log(messages)
  return messages;
};

export const saveMessage = async (
  data: FormStateDB
): Promise<FormStateDB[]> => {
  await db.message.upsert({
    where: { numberOfIncident: data.numberOfIncident },
    create: { ...data },
    update: { ...data },
  });
  return await db.message.findMany();
};

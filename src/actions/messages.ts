"use server";

import { FormStateDB } from "@/types/Form";
import { db } from "@/db";

export const getMessages = async () => {
  const messages = await db.message.findMany();
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
  return await db.message.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

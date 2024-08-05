"use server";

import { FormStateDB } from "@/types/Form";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const saveMessage = async (
  data: FormStateDB
): Promise<FormStateDB[]> => {
  await db.message.upsert({
    where: { numberOfIncident: data.numberOfIncident },
    create: { ...data },
    update: { ...data },
  });
  const messages = await db.message.findMany({
    orderBy: {
      id: "desc",
    },
  });
  revalidatePath("/messages");
  return messages;
};

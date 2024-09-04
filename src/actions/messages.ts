"use server";

import { FormStateDB } from "@/types/Form";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const saveMessage = async (data: FormStateDB) => {
  try {
    await db.message.upsert({
      where: { numberOfIncident: data.numberOfIncident },
      create: { ...data },
      update: { ...data },
    });
  } catch (err) {}

  revalidatePath("/incidents");
};

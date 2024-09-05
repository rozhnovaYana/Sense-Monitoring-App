"use server";

import { revalidatePath } from "next/cache";
import { FormState } from "@/types/Form";
import { db } from "@/db";
import { ActionState } from "@/types/ActionState";
import { auth } from "@/auth";
import msgs from "@/locales/ua.json";

export const saveMessage = async (data: FormState): Promise<ActionState> => {
  const session = await auth();
  const userId = session?.user?.id;

  // check if user exists and formDate is filled
  if (!userId) {
    return {
      error: msgs.access_denied,
    };
  }
  try {
    await db.message.upsert({
      where: { numberOfIncident: data.numberOfIncident },
      create: { ...data },
      update: { ...data },
    });
  } catch (err) {
    return {
      error: msgs.common_issue,
    };
  }

  revalidatePath("/incidents");
  return {
    isSuccess: true,
  };
};

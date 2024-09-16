"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { auth } from "@/auth";

import { FormState } from "@/types/Form";
import { ActionState } from "@/types/ActionState";

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
  let id = data?.id || 0;

  try {
    const message = await db.message.upsert({
      where: { id },
      create: { ...data },
      update: { ...data },
    });
    id = message.id;
  } catch (err) {
    return {
      error: msgs.common_issue,
    };
  }

  revalidatePath("/incidents");

  return {
    isSuccess: true,
    id,
  };
};

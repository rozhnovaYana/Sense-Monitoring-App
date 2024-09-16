"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { auth } from "@/auth";

import { fetchData } from "@/utils/https";

import { FormState } from "@/types/Form";
import { ActionState } from "@/types/ActionState";

import msgs from "@/locales/ua.json";

export const sendToWebex = async (
  data: FormState,
  formattedMessage: string,
  key: keyof FormState,
  variableKey: string
): Promise<ActionState & { formState?: FormState }> => {
  const session = await auth();
  const userId = session?.user?.id;
  // check if user exists and formDate is filled
  if (!userId) {
    return {
      error: msgs.access_denied,
    };
  }

  let id = data?.id || 0;
  let webexId = (data?.[key] as number) || "";
  let formState = data;

  try {
    const response = await fetchData(
      `https://webexapis.com/v1/messages/${webexId}`,
      webexId ? "PUT" : "POST",
      {
        roomId: process.env[variableKey],
        html: formattedMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WEBEX_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    webexId = response?.id;
    if (!webexId) {
      return {
        error: data?.[key]
          ? "Не вдалось змінити це повідомлення, ймовірно ви видалили його у чат-боті."
          : msgs.common_issue,
      };
    }
    // save message

    const message = await db.message.upsert({
      where: { id },
      create: { ...data, [key]: webexId },
      update: { ...data, [key]: webexId },
    });
    formState = message;
  } catch (err) {
    console.log(err);
    return {
      error: msgs.common_issue,
    };
  }

  revalidatePath("/incidents");

  return {
    isSuccess: true,
    formState,
  };
};
export const deleteFromWebex = async (
  data: FormState,
  key: keyof FormState,
  variableKey: string
): Promise<ActionState & { formState?: FormState }> => {
  const session = await auth();
  const userId = session?.user?.id;
  // check if user exists and formDate is filled
  if (!userId) {
    return {
      error: msgs.access_denied,
    };
  }
  const webexId = data?.[key];
  let formState = data;
  if (!webexId) {
    return {
      error: `Telegram Id має бути заповненим.`,
    };
  }
  try {
    const response = await fetchData(
      `https://webexapis.com/v1/messages/${webexId}`,
      "DELETE",
      {
        roomId: process.env[variableKey],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WEBEX_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    // save message
    const message = await db.message.update({
      where: { id: formState.id },
      data: {
        [key]: null,
      },
    });
    formState = message;
  } catch (err) {
    return {
      error: msgs.common_issue,
    };
  }

  revalidatePath("/incidents");

  return {
    isSuccess: true,
    formState,
  };
};

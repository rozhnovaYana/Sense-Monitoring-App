"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { auth } from "@/auth";

import { fetchData } from "@/utils/https";

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

export const sendToTelegram = async (
  data: FormState,
  formattedMessage: string
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
  let telegramId = data?.telegramId;
  let formState = data;

  try {
    const response = await fetchData(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${
        telegramId ? "editMessageText" : "sendMessage"
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: formattedMessage,
          message_id: telegramId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    telegramId = response?.result?.message_id;
    if (!telegramId) {
      return {
        error: data?.telegramId
          ? "Не вдалось змінити це повідомлення, ймовірно ви видалили його у чат-боті."
          : msgs.common_issue,
      };
    }

    // save message
    const message = await db.message.upsert({
      where: { id },
      create: { ...data, telegramId },
      update: { ...data, telegramId },
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

export const deleteFromTelegram = async (
  data: FormState
): Promise<ActionState & { formState?: FormState }> => {
  const session = await auth();
  const userId = session?.user?.id;
  // check if user exists and formDate is filled
  if (!userId) {
    return {
      error: msgs.access_denied,
    };
  }
  const telegramId = data.telegramId;
  let formState = data;
  if (!telegramId) {
    return {
      error: `Telegram Id має бути заповненим.`,
    };
  }
  try {
    const response = await fetchData(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/deleteMessage`,
      {
        method: "POST",
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          message_id: telegramId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // save message
    const message = await db.message.update({
      where: { id: formState.id },
      data: {
        telegramId: null,
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

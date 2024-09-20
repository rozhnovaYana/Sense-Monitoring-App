"use server";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { auth } from "@/auth";

import { FormState } from "@/types/Form";
import { ActionState } from "@/types/ActionState";

import msgs from "@/locales/ua.json";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SMTP,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendToMail = async (
  data: FormState,
  formattedMessage: string,
  key: keyof FormState = "mailId"
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
  let mailId = data?.[key] as string;
  let formState = data;

  try {
    const response = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: data.theme,
      text: formattedMessage,
    });

    mailId = response?.messageId;
    if (!mailId) {
      return {
        error: msgs.common_issue,
      };
    }

    // save message
    const message = await db.message.upsert({
      where: { id },
      create: { ...data, mailId },
      update: { ...data, mailId },
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

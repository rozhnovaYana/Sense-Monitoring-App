"use server";

import { revalidatePath } from "next/cache";

import { PostSchema } from "@/actions/schema";

import { auth } from "@/auth";
import { db } from "@/db";

import messages from "@/locales/ua.json";

import { createDiscussState } from "@/types/FormStates";
import { DeleteState } from "@/types/ActionState";

export const createComment = async (
  state: createDiscussState,
  formData: FormData
): Promise<createDiscussState> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId)
    return {
      errors: {
        _form: messages.access_denied,
      },
    };

  const post = {
    content: formData.get("content") || "",
  };

  const validatedData = PostSchema.safeParse(post);

  const commentID = (formData.get("id") || "") as string;
  const postId = (formData.get("postId") || "") as string;

  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }

  const data = { ...validatedData.data, postId, userId };

  try {
    await db.comment.upsert({
      where: { id: commentID },
      create: { ...data },
      update: { ...data },
    });
  } catch {
    return {
      errors: {
        _form: messages.common_issue,
      },
    };
  }

  revalidatePath("/posts");
  return { errors: {}, isSuccess: true };
};

export const deleteComment = async (id: string): Promise<DeleteState> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      error: messages.access_denied,
    };
  }

  try {
    await db.comment.delete({
      where: { id },
    });
  } catch {
    return {
      error: messages.common_issue,
    };
  }

  revalidatePath("/posts");
  return {
    isSuccess: true,
  };
};

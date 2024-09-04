"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { PostSchema } from "@/actions//schema";
import { revalidatePath } from "next/cache";
import { createDiscussState } from "@/types/FormStates";
import messages from "@/locales/ua.json";
import { DeleteState } from "@/types/ActionState";
export const createPost = async (
  state: createDiscussState,
  formData: FormData
): Promise<createDiscussState> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      errors: {
        _form: messages.access_denied,
      },
    };
  }
  const post = {
    content: formData.get("content") || "",
  };
  const postId = (formData.get("id") || "") as string;
  const validatedData = PostSchema.safeParse(post);
  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }

  const data = {
    userId,
    ...validatedData.data,
  };

  try {
    const post = await db.post.upsert({
      where: { id: postId },
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
export const deletePost = async (id: string): Promise<DeleteState> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      error: messages.access_denied,
    };
  }
  try {
    const post = await db.post.delete({
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

"use server";

import { auth } from "@/auth";
import { PostSchema } from "./schema";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

type createDiscussState = {
  errors: {
    _form?: string;
    content?: string[];
  };
};
export const createComment = async (
  state: createDiscussState,
  formData: FormData
): Promise<createDiscussState> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      errors: {
        _form: "Тільки зареєстровані користувачі можуть додавати коментарі.",
      },
    };
  }
  const post = {
    content: formData.get("content") || "",
  };
  const commentID = (formData.get("id") || "") as string;
  const postId = (formData.get("postId") || "") as string;
  const validatedData = PostSchema.safeParse(post);
  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }

  const data = { ...validatedData.data, postId, userId };
  console.log(data);
  try {
    await db.comment.upsert({
      where: { id: commentID },
      create: { ...data },
      update: { ...data },
    });
  } catch {
    return {
      errors: {
        _form: "Щось пішло не так, будь ласка, спробуйте пізніше.",
      },
    };
  }
  revalidatePath("/posts");
  return { errors: {} };
};

export const deleteComment = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return;

  try {
    await db.comment.delete({
      where: { id },
    });
  } catch {}
  revalidatePath("/posts");
};

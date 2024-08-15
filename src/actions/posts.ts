"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { PostSchema } from "@/actions//schema";
import { revalidatePath } from "next/cache";

export type createDiscussState = {
  errors: {
    content?: string[];
    _form?: string;
  };
};

export const createPost = async (
  state: createDiscussState,
  formData: FormData
): Promise<createDiscussState> => {
  const session = await auth();
  const user = session?.user?.name;

  if (!user) {
    return {
      errors: {
        _form: "Ви маєте спочатку зареєструватись у системі.",
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
    user,
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
        _form: "Щось пішло не так, будь ласка, спробуйте пізніше.",
      },
    };
  }
  revalidatePath("/posts");
  return { errors: {} };
};
export const deletePost = async (id: string) => {
  const session = await auth();
  const user = session?.user?.name;

  if (!user) return;

  try {
    const post = await db.post.delete({
      where: { id },
    });
  } catch {}
  revalidatePath("/posts");
};

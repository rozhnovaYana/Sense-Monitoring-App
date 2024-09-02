"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { UserLoginSchema, UserSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { createUserState } from "@/types/FormStates";
import messages from "@/locales/ua.json";
export const createUser = async (
  actionName: string,
  state: createUserState,
  formData: FormData
): Promise<createUserState> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      errors: {
        _form: messages.access_denied,
      },
    };
  }
  const role = session?.user?.role;
  if (role !== "ADMIN") {
    return {
      errors: {
        _form: "Тільки адміністратори можуть додавати/редагувати користувачів.",
      },
    };
  }
  const user = {
    login: formData.get("login") || "",
    name: formData.get("name") || "",
    role: formData.get("role") || "",
  };

  const validatedData = UserLoginSchema.safeParse(user);
  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }
  try {
    const user = await db.user.findFirst({
      where: {
        login: validatedData.data?.login,
      },
    });

    if (user && actionName === "create") {
      return {
        errors: {
          _form: "Користувач з таким логіном вже існує!",
        },
      };
    }

    await db.user.upsert({
      where: { id: user?.id || "" },
      create: { ...validatedData.data },
      update: { ...validatedData.data },
    });
  } catch {
    return {
      errors: {
        _form: messages.common_issue,
      },
    };
  }

  revalidatePath("/admin");
  return { errors: {}, isSuccess: true };
};

export const deleteUser = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const user = await db.user.delete({
      where: { id },
    });
  } catch {}
  revalidatePath("/users");
};

"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signIn } from "@/auth";
import { UserSchema } from "@/actions/schema";
import { LoginFormState } from "@/types/LoginForm";

export const signInAction = async (
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const user = {
    name: formData?.get("name") || "",
    password: formData?.get("password") || "",
  };
  const validatedData = UserSchema.safeParse(user);

  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }
  try {
    await signIn("credentials", {
      ...validatedData.data,
      redirectTo: "/",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      errors: {
        form:
          error instanceof AuthError
            ? "Перевірте логін і пароль. "
            : "Спробуйте пізніше.",
      },
    };
  }
  return { errors: {} };
};

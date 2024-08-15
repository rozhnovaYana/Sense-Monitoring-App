import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().trim().min(3),
  password: z.string().trim().min(3),
});

export const PostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3, "Повідомлення повинно мати мінімум 3 символи."),
});

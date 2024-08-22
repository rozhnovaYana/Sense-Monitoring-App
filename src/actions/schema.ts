import { Role } from "@prisma/client";
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

const VALUES = ["ADMIN", "USER"] as const;
export const UserLoginSchema = z.object({
  name: z.string().trim().min(3),
  login: z.string().trim().min(3),
  role: z.enum(VALUES),
});

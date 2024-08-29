import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().trim().min(3),
  password: z.string().trim().min(3),
});

export const IncidentSchema = z.object({
  message: z.string().trim().min(3),
  timeRequest: z.string().trim().min(3),
  timeSend: z.string().trim().min(3),
  reporter: z.string().trim().min(3),
  numberOfIncident: z.string().trim().min(3),
  startDate: z.string().trim().min(3),
});

export const PostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3, "Повідомлення повинно мати мінімум 3 символи."),
});

export const UserLoginSchema = z.object({
  name: z.string().trim().min(3),
  login: z.string().trim().min(3),
  role: z.enum(["ADMIN", "USER"] as const),
});

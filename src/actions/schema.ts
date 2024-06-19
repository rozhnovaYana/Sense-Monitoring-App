import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().trim().min(3),
  password: z.string().trim().min(3),
});

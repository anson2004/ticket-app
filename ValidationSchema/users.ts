import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "name is required").max(255),
  username: z.string().min(3, "username is required").max(255),
  password: z
    .string()
    .min(6, "password must be at least 6 digits")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "role is required").max(10),
});

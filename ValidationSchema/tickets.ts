import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "title is required").max(255),
  description: z.string().min(1, "description is required").max(5555),
  status: z.string().min(1, "status").max(6).optional(),
  priority: z.string().min(1, "priority").max(6).optional(),
});

import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  picture: z.string().optional(),
});

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  picture: z.string().optional(),
});

export type createUserInput = z.TypeOf<typeof createUserSchema>;

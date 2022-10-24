import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  image: z.string().optional(),
});

// location: z.string().optional(), // don't need? when I register, information will never be present
// bio: z.string().optional(), // don't need?
// twitter: z.string().optional(), // don't need?
// insta: z.string().optional(), // don't need?
// facebook: z.string().optional(), // don't need?
// website: z.string().optional(), // don't need?

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  picture: z.string().optional(),
});

export const getSingleUserSchema = z.object({
  userId: z.string().cuid(),
});

export type getSingleUser = z.TypeOf<typeof getSingleUserSchema>;

export type createUserInput = z.TypeOf<typeof createUserSchema>;

export const updateUserInput = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  location: z.string().optional(),
  about: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
});

export type updateUserType = z.TypeOf<typeof updateUserInput>;

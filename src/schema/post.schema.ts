import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .max(256, "Max title length is 256 characters")
    .min(15, "Min title length is 15 characters"),
  body: z.string().min(50, "Min body is 50 characters"),
  images: z.string().array().optional(),
  tags: z.string().array().optional(),
});

export type createPostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchema = z.object({
  postId: z.string().cuid(),
});

export type getSinglePost = z.TypeOf<typeof getSinglePostSchema>;

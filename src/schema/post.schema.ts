import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .max(256, "Max title length is 256 characters")
    .min(15, "Min title length is 15 characters"),
  body: z.string().min(50, "Min body is 50 characters"),
  images: z.array(z.string()).optional(),
  tags: z.string().array().min(1, "must have at least one tag"),
});

export type createPostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchema = z.object({
  postId: z.string(),
});

export type getSinglePost = z.TypeOf<typeof getSinglePostSchema>;

// this might be not what I need to do.
// How to satisfy what type getS3url needs?
export const getS3Url = z.object({
  numberOfImages: z.number(),
});

export type getS3UrlInput = z.TypeOf<typeof getS3Url>;

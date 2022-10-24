import z from "zod";

// in theory, I shouldn't need these, since their values will default on comment creation.
//  commentId: z.string().cuid(),
// likes: z.number(),
// timeStamp: z.date(),
// isAnswer: z.boolean(),

export const createCommentInput = z.object({
  postId: z.string().cuid(),
  text: z.string().min(1, "cannot be empty"),
  images: z.array(z.string()).optional(),
});
export type createCommentType = z.TypeOf<typeof createCommentInput>;

export const getPostsCommentsSchema = z.object({
  postId: z.string(), // should i add .cuid() ?
});

export type getPostsCommentsType = z.TypeOf<typeof getPostsCommentsSchema>;

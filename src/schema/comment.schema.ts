import z from "zod";

// CREATE COMMENT
export const createCommentInput = z.object({
  postId: z.string().cuid(),
  text: z.string().min(1, "cannot be empty"),
  images: z.array(z.string()).optional(),
});
export type createCommentType = z.TypeOf<typeof createCommentInput>;

// GET ALL COMMENTS
export const getPostsCommentsSchema = z.object({
  postId: z.string(), // should i add .cuid() ?
});
export type getPostsCommentsType = z.TypeOf<typeof getPostsCommentsSchema>;

// DELETE COMMENT
export const deleteCommentInput = z.object({
  commentId: z.string().cuid(),
  commentedById: z.string().cuid(),
});
export type deleteCommentType = z.TypeOf<typeof deleteCommentInput>;

// EDIT / UPDATE COMMENT
export const editCommentInput = z.object({
  postId: z.string().cuid(),
  text: z.string().min(1, "cannot be empty"),
});
export type editCommentType = z.TypeOf<typeof editCommentInput>;

// CREATE REPLY
export const createReplyInput = z.object({
  userId: z.string().cuid(),
  postId: z.string().cuid(),
  commentId: z.string().cuid(),
  text: z.string().min(1, "cannot be empty"),
  images: z.array(z.string()).optional(),
});
export type createReplyType = z.TypeOf<typeof createReplyInput>;

import * as trpc from "@trpc/server";
import { createRouter } from "../createRouter";
import {
  createCommentInput,
  getPostsCommentsSchema,
} from "../../schema/comment.schema";

export const commentRouter = createRouter()
  .mutation("create-comment", {
    input: createCommentInput,
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Cannot comment on a post while logged out",
        });
      }
      const { postId } = input;
      let newInput = input;
      delete newInput.postId;

      const comment = await ctx.prisma.comment.create({
        data: {
          ...newInput,
          Post: {
            connect: {
              postId,
            },
          },
          User: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
      return comment;
    },
  })
  .query("all-one-post-comments", {
    input: getPostsCommentsSchema,
    resolve({ ctx, input }) {
      const { postId } = input;
      return ctx.prisma.comment.findMany({
        where: { postId },
        include: {
          User: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    },
  });

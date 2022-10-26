import * as trpc from "@trpc/server";
import { createRouter } from "../createRouter";
import {
  createCommentInput,
  createReplyInput,
  deleteCommentInput,
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
      const { postId, images, text } = input;
      let newInput = { images, text };

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
              id: true,
            },
          },
        },
      });
    },
  })
  .mutation("delete-comment", {
    input: deleteCommentInput,
    async resolve({ ctx, input }) {
      const { commentId, commentedById } = input;
      // need to check if same user. can't delete some one elses post.
      console.log(ctx.session?.user?.id, input.userId);
      if (!ctx.session?.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Cannot comment on a post while logged out",
        });
        if (ctx.session?.user?.id !== commentedById) {
          new trpc.TRPCError({
            code: "FORBIDDEN",
            message: "You can only delete your own comments!",
          });
        }
        const deletedComment = ctx.prisma.comment.delete({
          where: { commentId: commentId },
        });
        return deletedComment;
      }
    },
  })
  .mutation("create-reply", {
    input: createReplyInput,
    async resolve({ ctx, input }) {
      const { commentId, postId, text, userId } = input;
      const parentId = commentId;
      const reply = await ctx.prisma.comment.create({
        data: {
          text,
          parentId,
          Post: {
            connect: {
              postId,
            },
          },
          User: {
            connect: {
              id: userId,
            },
          },
        },
      });
    },
  });

// CommentCreateInput {
//   commentId?: String
//   text?: String
//   images?: CommentCreateimagesInput | List<String>
//   Post: PostCreateNestedOneWithoutCommentsInput
//   createdAt?: DateTime
//   updatedAt?: DateTime
//   selectedAnswer?: Boolean
//   upVotes?: Int
//   User: UserCreateNestedOneWithoutCommentsInput
// }

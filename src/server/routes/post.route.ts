import {
  createPostSchema,
  getSinglePostSchema,
} from "../../schema/post.schema";
import * as trpc from "@trpc/server";
import { createRouter } from "../createRouter";

export const postRouter = createRouter()
  .mutation("create-post", {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Cannot create a post while logged out",
        });
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          author: {
            connect: {
              id: ctx.session?.user?.id,
              //email: ctx.session?.user?.email!,  <-- I deleted this because prisma create post yelled at me.
            },
          },
        },
      });
      return post;
    },
  })
  .query("posts", {
    resolve({ ctx }) {
      return ctx.prisma.post.findMany({
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    },
  })
  .query("single-post", {
    input: getSinglePostSchema,
    resolve({ input, ctx }) {
      console.log("hi");
      return ctx.prisma.post.findUnique({
        where: {
          postId: input.postId,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    },
  });

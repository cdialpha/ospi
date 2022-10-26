import { createRouter } from "../createRouter";
import { postRouter } from "./post.route";
import { s3Router } from "./s3upload.route";
import { userRouter } from "./user.route";
import { commentRouter } from "./comment.route";

export const appRouter = createRouter()
  .merge("posts.", postRouter)
  .merge("users.", userRouter)
  .merge("comments.", commentRouter)
  .merge("s3.", s3Router);

export type AppRouter = typeof appRouter;

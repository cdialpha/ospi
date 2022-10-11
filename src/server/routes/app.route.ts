import { createRouter } from "../createRouter";
// import { userRouter } from "./user.router";
import { postRouter } from "./post.route";
import { s3Router } from "./s3upload.route";

export const appRouter = createRouter()
  .merge("posts.", postRouter)
  .merge("s3.", s3Router);

export type AppRouter = typeof appRouter;

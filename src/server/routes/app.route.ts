import { createRouter } from "../createRouter";
// import { userRouter } from "./user.router";
import { postRouter } from "./post.route";

export const appRouter = createRouter().merge("posts.", postRouter);
// .merge("users.", userRouter);

export type AppRouter = typeof appRouter;

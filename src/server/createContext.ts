import * as trpcNext from "@trpc/server/adapters/next";
import * as trpc from "@trpc/server";
import { verifyJwt } from "../utils/jwt";
import { prisma } from "../utils/prsima";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../pages/api/auth/[...nextauth]";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;
  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions));

  return { req, res, session, prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

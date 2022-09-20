import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);

// FacebookProvider({
//     clientId: env.FACEBOOK_CLIENT_ID,
//     clientSecret: env.FACEBOOK_CLIENT_SECRET,
//   })

// THIS CAME OUT OTB WITH NEXT AUTH.
// callbacks: {
//   session({ session, user }) {
//     if (session.user) {
//       session.user.id = user.id;
//     }
//     return session;
//   },
// },

// RECOMMENDED BY NEXT AUTH GOOGLE DOC
// callbacks: {
//   async signIn({ account, profile }) {
//     if (account.provider === "google") {
//       return profile.email_verified && profile.email.endsWith("@example.com");
//     }
//     return true; // Do different verification for other providers that don't have `email_verified`
//   },
// },

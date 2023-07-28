import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Email", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // todo

    //     return null;
    //   },
    // }),
  ],
  secret: "IamVeryHandsome",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session({ session, token, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
};

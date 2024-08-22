import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { execSync } from "child_process";

import { fetchData } from "@/utils/https";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username" },
        login: { label: "Login" },
        role: { label: "Role" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const data =
          (await fetchData(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              login: credentials?.name,
            }),
          })) || [];

        if (!data.user) {
          return {};
        }
        const stdout = execSync(
          `bash sense_auth.sh ${credentials.name} ${credentials.password}`
        )?.toString();

        if (stdout.trim() !== "login accepted") {
          return {};
        }
        return { ...data.user };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    async signIn({ user, ...props }) {
      if (!user?.id) {
        return false;
      }
      return true;
    },
    async session({ session, token }: any) {
      if (session && token) {
        session.user = token?.user;
      }

      return session;
    },
  },
});

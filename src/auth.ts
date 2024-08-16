import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { execSync } from "child_process";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const stdout = execSync(
          `bash sense_auth.sh ${credentials.name} ${credentials.password}`
        )?.toString();
        if (stdout.trim() !== "login accepted") {
          return {};
        }
        return { name: credentials.name as string };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, ...props }) {
      if (!user?.name) {
        return false;
      }
      return true;
    },
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});

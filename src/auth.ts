import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ldap from "ldapjs";

import { fetchData } from "@/utils/https";

import { User } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        name: { label: "DN", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
        login: { label: "Login" },
        role: { label: "Role" },
      },
      authorize: async (credentials) => {
        const name = credentials.name as string;
        const password = credentials.password as string;

        if (!name || !password) {
          return {};
        }

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

        const client = ldap.createClient({
          url: process.env.LDAP_URI || "",
        });

        let user: User | {} = {};

        client.bind(name, password, (error) => {
          if (error) {
            user = {};
          } else {
            user = { ...data.user };
          }
        });

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt({ token, user }) {
      if (user?.name) {
        token.user = { ...user };
      }
      return token;
    },
    async signIn({ user, ...props }) {
      if (!user?.name) {
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

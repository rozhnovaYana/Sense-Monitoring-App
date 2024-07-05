import ldap from "ldapjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        name: { label: "DN", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { name: string; password: string }) {
        const client = ldap.createClient({
          url: process.env.LDAP_URI || "",
        });

        return new Promise((resolve, reject) => {
          client.bind(credentials.name, credentials.password, (error) => {
            if (error) {
              console.error("Failed");
              reject();
            } else {
              console.log("Logged in");
              resolve({
                name: credentials.name,
              });
            }
          });
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.name = user.name;
      }
      return token;
    },
  },
});

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ldap from "ldapjs";
import { fetchData } from "@/utils/https";

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

        // remove the next line for the production
        return { ...data.user };

        const client = ldap.createClient({
          url: process.env.LDAP_URI || "",
        });
        let entryExist = false;

        return new Promise((resolve, reject) => {
          client.bind(
            process.env.LDAP_DN as string,
            process.env.LDAP_PASSWORD as string,
            (error) => {
              if (error) {
                reject("LDAP bound failed");
              } else {
                const opts: ldap.SearchOptions = {
                  filter: `(&(SamAccountName=${name}))`,
                  scope: "sub",
                  attributes: ["dn", "sn", "cn", "SamAccountName"],
                };

                client.search(
                  process.env.LDAP_BASE_DN as string,
                  opts,
                  (err, res) => {
                    if (err) {
                      reject(`User ${name} LDAP search error`);
                    } else {
                      console.log("not error");
                      res.on("searchEntry", (entry) => {
                        console.log("inside search entry");
                        console.log(entry.pojo);
                        entryExist = true;
                        const cn = entry?.pojo?.attributes?.find(
                          (el) => el?.type === "cn"
                        )?.values;
                        const dn = entry.pojo.objectName.replace(
                          /CN=[^,]+/,
                          `CN=${cn}`
                        );

                        client.bind(dn, password, (err, res) => {
                          if (err) {
                            reject(`User ${name} username or password problem`);
                          } else {
                            resolve({
                              ...data.user,
                            });
                          }
                        });
                      });
                      res.on("searchReference", (referral) => {
                        console.log("referral: " + referral.uris.join());
                      });
                      res.on("error", (err) => {
                        reject("LDAP SEARCH error");
                      });
                      res.on("end", (result) => {
                        if (!entryExist) {
                          reject("User is not found");
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        });
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

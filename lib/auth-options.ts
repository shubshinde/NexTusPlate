import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import directus from "@/lib/directus";
import { readMe, withToken } from "@directus/sdk";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "user@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "",
        },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const user = await res.json();
        // If no error and we have user data, return it
        if (!res.ok && user) {
          throw new Error("Email address or password is invalid");
        }
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", //sigin page
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      if (account && user) {
        const userData = await directus.request(
          withToken(
            user.data.access_token as string,
            readMe({
              fields: ["id", "first_name", "last_name", "email"],
            }),
          ),
        );

        // Resign the user data keys as suggested by nextauth.js
        const adaptedUserData = {
          id: userData.id,
          name: `${userData.first_name} ${userData.last_name}`,
          email: userData.email,
        };

        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          user: adaptedUserData,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session | any; token: any }) {
      // Check if session.user is defined before accessing its properties
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user = token.user;
      }
      return session;
    },
  },
};

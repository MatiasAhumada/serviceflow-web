import { authApiService } from "@/services";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { APP_ROUTES } from "@/constants/routes.constants";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await authApiService.login({
            email: credentials.email as string,
            password: credentials.password as string,
          });
          return {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            plan: response.user.userType.code,
            permissions: [],
            userType: response.user.userType,
            company: response.user.company ? {
              id: response.user.company.id as string,
              name: response.user.company.name as string,
            } : null,
            companyId: response.user.company?.id as string || null,
            role: response.user.role ? {
              id: response.user.role.id as string,
              name: response.user.role.name as string,
            } : null,
            accessToken: response.access_token,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: APP_ROUTES.LOGIN,
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = user.plan;
        token.permissions = user.permissions;
        token.userType = user.userType;
        token.company = user.company;
        token.companyId = user.companyId;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.sessionId = `${user.id}-${Date.now()}`;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.plan = token.plan;
        session.user.permissions = token.permissions;
        session.user.userType = token.userType;
        session.user.company = token.company;
        session.user.companyId = token.companyId;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    }
  },
  events: {
    async signOut() {
      console.log("Session closed");
    }
  }
});
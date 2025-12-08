import { authApiService } from "@/services";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { APP_ROUTES } from "@/constants/routes.constants";

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
            company: response.user.company,
            role: response.user.role,
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
        token.role = user.role;
        token.sessionId = `${user.id}-${Date.now()}`;
      }
      return token;
    },
    async session(params) {
      if ('token' in params && params.token && params.session.user) {
        params.session.user.id = params.token.sub!;
        params.session.user.plan = params.token.plan;
        params.session.user.permissions = params.token.permissions;
        params.session.user.userType = params.token.userType;
        params.session.user.company = params.token.company;
        params.session.user.role = params.token.role;
      }
      return params.session;
    }
  },
  events: {
    async signOut({ token }) {
      // Limpiar sesión al cerrar
      console.log("Session closed for user:", token?.sub);
    }
  }
});
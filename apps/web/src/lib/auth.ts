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
            plan: response.user.planType,
            permissions: response.user.roleId ? ["authenticated"] : [],
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
    async jwt({ token, user, trigger }) {
      // Prevenir múltiples sesiones: invalidar token anterior
      if (user) {
        token.plan = user.plan;
        token.permissions = user.permissions;
        token.sessionId = `${user.id}-${Date.now()}`; // ID único por sesión
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.plan = token.plan as string;
        session.user.permissions = token.permissions as string[];
      }
      return session;
    }
  },
  events: {
    async signOut({ token }) {
      // Limpiar sesión al cerrar
      console.log("Session closed for user:", token?.sub);
    }
  }
});
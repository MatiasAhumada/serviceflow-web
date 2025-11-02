// Simulación del backend
export const mockBackend = {
  async login(email: string, password: string) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Usuario demo
    if (email === "admin@serviceflow.com" && password === "123456") {
      return {
        id: "1",
        name: "Admin ServiceFlow",
        email: "admin@serviceflow.com",
        plan: "premium",
        permissions: ["read", "write", "admin"]
      };
    }
    
    throw new Error("Invalid credentials");
  },
  
  async logout() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  }
};

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
          // Usar mock backend directamente
          const user = await mockBackend.login(credentials.email, credentials.password);
          return user;
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = user.plan;
        token.permissions = user.permissions;
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
  }
});
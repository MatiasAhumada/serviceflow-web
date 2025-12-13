import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

interface UserType {
  id: string;
  code: string;
  name: string;
}

interface Company {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: string;
      permissions: string[];
      userType: UserType;
      company: Company | null;
      companyId: string | null;
      role: Role | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    plan: string;
    permissions: string[];
    userType: UserType;
    company: Company | null;
    companyId: string | null;
    role: Role | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    plan: string;
    permissions: string[];
    userType: UserType;
    company: Company | null;
    companyId: string | null;
    role: Role | null;
    sessionId: string;
  }
}
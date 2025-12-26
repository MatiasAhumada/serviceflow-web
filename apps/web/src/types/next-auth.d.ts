import { DefaultSession, DefaultUser } from "next-auth";

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
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    plan: string;
    permissions: string[];
    userType: UserType;
    company: Company | null;
    companyId: string | null;
    role: Role | null;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  import { DefaultJWT } from "next-auth/jwt";
  
  interface JWT extends DefaultJWT {
    plan: string;
    permissions: string[];
    userType: UserType;
    company: Company | null;
    companyId: string | null;
    role: Role | null;
    accessToken: string;
    sessionId: string;
  }
}
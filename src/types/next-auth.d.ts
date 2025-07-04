import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role: string;
    isVerified?: boolean;
    provider?: string;
    organizationIds?: string[];
    currentOrganizationId?: string;
    preferences?: {
      theme: string;
      language: string;
      timezone: string;
    };
  }

  interface Session {
    user: {
      id?: string;
      role: string;
      provider?: string;
      image?: string;
      isVerified?: boolean;
      organizationIds?: mongoose.Schema.Types.ObjectId[] | string[];
      currentOrganizationId?: mongoose.Schema.Types.ObjectId | string | null;
      preferences?:
        | {
            theme: string;
            language: string;
            timezone: string;
          }
        | undefined;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string | null | undefined;
    email: string | null | undefined;
    role: string;
    image?: string | null | undefined;
  }
}

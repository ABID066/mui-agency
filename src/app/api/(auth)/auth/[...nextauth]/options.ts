import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import { connectDB } from "@/database/dbConfig";
import { User as AuthUser } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Credentials | undefined
      ): Promise<AuthUser | null> {
        if (!credentials) {
          throw new Error("Credentials not found!");
        }
        try {
          await connectDB();
          const { email, password } = credentials;
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid Credentials!");
          }
          if (!user?.isVerified) {
            throw new Error("Please verify your email!");
          }
          const matchPassword = await bcrypt.compare(
            password,
            user.password || ""
          );
          if (!matchPassword) {
            throw new Error("Invalid Credentials!");
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image || "",
            role: user.role || "user",
            isVerified: user.isVerified || false,
            organizationIds: (user?.organizationIds || []).map(id => id.toString()),
            currentOrganizationId: user?.currentOrganizationId?.toString() || null,
            preferences: user?.preferences || {},
          } as AuthUser;
        } catch (err: unknown) {
          console.error('Auth Error:', err);
          throw new Error(err instanceof Error ? err.message : 'Authentication failed');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // console.log(user, account, profile, "from line 63:");
      await connectDB();
      const userExist = await User.findOne({ email: user?.email });
      if (!userExist) {
        const newUser = new User({
          name: user?.name,
          email: user?.email,
          image: user?.image || "",
          provider: account?.provider,
          isVerified: true,
        });
        await newUser.save();
      }
      user.role = userExist?.role || "user";
      return true;
    },
    async jwt({ user, token }) {
      if (user) {
        token.name = user?.name;
        token.email = user?.email;
        token.role = user?.role;
        token.image = user?.image;
        token.organizationIds = user?.organizationIds;
        token.currentOrganizationId = user?.currentOrganizationId;
        token.isVerified = user?.isVerified;
        token.preferences = user?.preferences;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token && session?.user) {
        session.user.name = token?.name;
        session.user.email = token?.email;
        session.user.role = token?.role;
        if (typeof token?.image === "string") {
          session.user.image = token?.image;
        }
        session.user.organizationIds = (token?.organizationIds as string[]) || [];
        session.user.currentOrganizationId = token?.currentOrganizationId as string | undefined;
        session.user.isVerified = token?.isVerified as boolean | undefined;
        session.user.preferences = token?.preferences as { theme: string; language: string; timezone: string; } | undefined;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
};

interface Credentials {
  email: string;
  password: string;
}
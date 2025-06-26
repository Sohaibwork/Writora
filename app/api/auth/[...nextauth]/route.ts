/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("Invalid email or password");
          }
          if (!user.isVerified) {
            throw new Error(
              "Email not verified, please verify your email first."
            );
          }
          if (!user.password || typeof user.password !== "string") {
            throw new Error("Invalid email or password");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordValid) {
            return user;
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error: any) {
          console.error("Database connection error:", error);
          throw new Error(error.message || " connection error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

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
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const userDoc = await User.findOne({ email: credentials.email });

        if (!userDoc || !userDoc.password)
          throw new Error("Invalid email or password");

        const isValid = await bcrypt.compare(
          credentials.password,
          userDoc.password
        );
        if (!isValid) throw new Error("Invalid email or password");

        // Convert Mongoose document to plain object and remove sensitive fields
        const user = userDoc.toObject();
        delete user.password;
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

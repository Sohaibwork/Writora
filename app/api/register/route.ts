import { connectDB } from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Email already exsist" },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return NextResponse.json(
    {
      message: "Registered successfully",
      user: { id: user._id, email: user.email },
    },
    { status: 201 }
  );
}

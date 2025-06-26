import mongoose from "mongoose";

export interface IUser {
  name?: string | null;
  email: string;
  password?: string | null;
  isVerified?: boolean;
}
const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);

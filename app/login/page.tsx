/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) setError(res.error);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login successful!");
      router.push("/");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don’t have an account?
        <a href="/register" className="text-blue-600">
          Register
        </a>
      </p>
    </div>
  );
}

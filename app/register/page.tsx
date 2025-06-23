/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e: any) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?
        <a href="/login" className="text-blue-600">
          Login
        </a>
      </p>
    </div>
  );
}

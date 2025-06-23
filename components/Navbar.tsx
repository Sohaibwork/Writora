"use client";

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          {/* InkWell<span className="text-gray-900">AI</span> */}
          <Image src="/images/logo3.png" width={100} height={50} alt="logo" />
        </Link>

        {/* Links */}
        <div className="flex gap-4 items-center">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/editor" className="hover:underline">
            New Post
          </Link>

          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isLoggedIn = !!session; // true if session exists

  return (
    <nav className="bg-blue-100 text-gray-600 w-full shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-3xl logo-font font-bold bg-gradient-to-r from-[#0b3c58] to-[#2f90ab] bg-clip-text text-transparent tracking-wide">
            Writora
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/"
            className="text-cyan-700 font-semibold text-lg hover:underline"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-cyan-700 font-semibold text-lg hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href="/editor"
            className="text-cyan-700 font-semibold text-lg hover:underline"
          >
            Editor
          </Link>

          {isLoggedIn ? (
            <Link
              href="/logout"
              className="bg-red-400 text-white py-1 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="bg-[#2ba8fb] text-white py-1 px-4 rounded hover:bg-[#2ba8fbd4] transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-50 px-4 pb-4">
          <Link
            href="/"
            className="block py-2 text-cyan-700 font-semibold text-lg"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="block py-2 text-cyan-700 font-semibold text-lg"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/editor"
            className="block py-2 text-cyan-700 font-semibold text-lg"
            onClick={toggleMenu}
          >
            Editor
          </Link>
          {isLoggedIn ? (
            <Link
              href="/logout"
              className="block py-2 text-white bg-red-500 text-center rounded"
              onClick={toggleMenu}
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/sign-in"
              onClick={toggleMenu}
              className="block w-full py-2 text-white bg-[#2ba8fb] rounded text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

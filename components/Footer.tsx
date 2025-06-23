"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-100 text-gray-700 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0b3c58] to-[#2f90ab] bg-clip-text text-transparent">
            Writora
          </h2>
          <p className="mt-3 text-sm text-gray-600">Write. Express. Inspire.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:underline text-sm">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/editor" className="hover:underline text-sm">
                Editor
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline text-sm">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className="hover:underline text-sm">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:underline text-sm">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline text-sm">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline text-sm">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <Facebook size={22} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-500">
              <Twitter size={22} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <Instagram size={22} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Writora. All rights reserved.
      </div>
    </footer>
  );
}

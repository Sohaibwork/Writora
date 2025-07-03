"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-blue-50 py-16 px-6 md:px-12 lg:px-20 roboto">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 h-full">
        {/* Left Content */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#0b3c58] to-[#2f90ab] bg-clip-text text-transparent">
              Discover Smart AI Written Blogs
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Written by creators. Supercharged by AI.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start  gap-4">
            <Link
              href="/explore"
              className="bg-[#2ba8fb] text-white px-6 py-3 rounded-full font-semibold text-lg font-medium hover:bg-[#2ba8fbe1] transition"
            >
              Explore
            </Link>
            <Link
              href="/sign-in"
              className="border border-[#657de9] text-[#657de9] px-6 py-3 rounded-md text-lg font-medium hover:bg-[#e7ebff] transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <Image
            src="/images/blog.png"
            alt="Hero image"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

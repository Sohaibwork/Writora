"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const tags = ["AI", "Dev", "Health", "Design", "Marketing"];

export function BlogFilterBar() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <section className="bg-white px-4 md:px-8 py-6 shadow-sm text-black    ">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border text-[#7f7f7f] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2aa7fa]"
        >
          <option value="latest">Sort by Latest</option>
          <option value="popular">Sort by Popular</option>
        </select>
      </div>

      {/* Tags */}
      <div className="max-w-6xl mx-auto mt-4 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition cursor-pointer ${
              activeTag === tag
                ? "bg-[#2aa7fa] text-white border-[#657de9]"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}

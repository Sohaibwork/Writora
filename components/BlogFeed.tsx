"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import mockPosts from "../data/Posts.json";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Post = {
  title: string;
  coverImage: string;
  author: string;
  date: string;
  readingTime: string;
  status: string;
  tags: string[];
};

const POSTS_PER_PAGE = 6;

export function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session, status } = useSession();

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  if (status === "loading")
    return (
      <div className="text-center text-white  mt-10 font-semibold min-h-[400px] ">
        Loading...
      </div>
    );

  const freePosts = posts.filter((post) => post.status === "free");
  const authorizedPosts = posts.filter((post) => post.status === "authorized");

  const totalPages = Math.ceil(freePosts.length / POSTS_PER_PAGE);
  const paginatedPosts = freePosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="py-10 px-4 md:px-8 bg-blue-50">
      {paginatedPosts.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 font-semibold">
          No posts available.
        </div>
      ) : (
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Latest Posts
        </h2>
      )}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {session && authorizedPosts.length > 0 && (
          <div className="col-span-full text-center text-gray-500 mb-6">
            <p className="text-lg">
              You have access to {authorizedPosts.length} premium posts.
            </p>
          </div>
        )}
        {/* Render Free Posts */}
        {paginatedPosts.map((post, idx) => (
          <BlogCard key={idx} {...post} />
        ))}
        {/* Render Authorized Posts for logged-in users */}
        {session &&
          authorizedPosts.map((post, idx) => <BlogCard key={idx} {...post} />)}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center flex-wrap mt-8 gap-2 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded cursor-pointer ${
              currentPage === i + 1
                ? "bg-[#657de9] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {!session && (
        <div className="text-center text-gray-500 text-lg  my-10  mt-10">
          <p className="">
            <Link
              href="/sign-in"
              className="text-blue-500  px-2 py-1 border rounded-md mr-2 "
            >
              Login
            </Link>
            to see more posts and access premium content.
          </p>
        </div>
      )}
    </section>
  );
}

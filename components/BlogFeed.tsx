// "use client";

// import { useEffect, useState } from "react";
// import { BlogCard } from "./BlogCard";
// import Post from "../data/Posts.json";

// type Post = {
//   _id: string;
//   title: string;
//   coverImage: string;
//   author: string;
//   date: string;
//   readingTime: string;
//   status: string;
// };

// export function BlogFeed() {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     async function fetchPosts() {
//       const res = await fetch("/api/posts");
//       const data = await res.json();
//       setPosts(data);
//     }

//     fetchPosts();
//   }, []);

//   const publishedPosts = posts.filter((post) => post.status === "published");

//   return (
//     <section className="py-10 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {publishedPosts.map((post) => (
//           <BlogCard key={post._id} {...post} />
//         ))}
//       </div>
//     </section>
//   );
// }
// "use client";
// import { useEffect, useState } from "react";
// import { BlogCard } from "./BlogCard";
// import mockPosts from "../data/Posts.json"; // adjust path based on your structure

// type Post = {
//   title: string;
//   coverImage: string;
//   author: string;
//   date: string;
//   readingTime: string;
//   status: string;
//   tags: string[];
// };

// export function BlogFeed() {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     // Simulate fetching data
//     setPosts(mockPosts);
//   }, []);

//   const publishedPosts = posts.filter((post) => post.status === "published");

//   return (
//     <section className="py-10 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {publishedPosts.map((post, idx) => (
//           <BlogCard key={idx} {...post} />
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import mockPosts from "../data/Posts.json";

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

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const publishedPosts = posts.filter((post) => post.status === "published");

  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = publishedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="py-10 px-4 md:px-8 bg-blue-50">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post, idx) => (
          <BlogCard key={idx} {...post} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === i + 1
                ? "bg-[#657de9] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

import { BlogFeed } from "@/components/BlogFeed";
import { BlogFilterBar } from "@/components/BlogFilterBar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <BlogFilterBar />
      <BlogFeed />
    </>
  );
}

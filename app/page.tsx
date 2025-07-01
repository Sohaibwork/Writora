import { BlogFeed } from "@/components/BlogFeed";
import { BlogFilterBar } from "@/components/BlogFilterBar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BlogFilterBar />
      <BlogFeed />
      <Footer />
    </>
  );
}

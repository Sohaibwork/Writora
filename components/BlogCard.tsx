import Image from "next/image";
import Link from "next/link";
type BlogCardProps = {
  title: string;
  coverImage: string;
  author: string;
  date: string;
  readingTime: string;
};

export function BlogCard({
  title,
  coverImage,
  author,
  date,
  readingTime,
}: BlogCardProps) {
  return (
    <div className="bg-white shadow-md cursor-pointer rounded-lg overflow-hidden hover:shadow-xl  transition">
      <Image
        width={400}
        height={200}
        src={coverImage}
        alt={title}
        className="w-full h-48 "
      />
      <div className="p-4 border-t ">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="text-sm text-gray-500 text-nowrap flex-col  gap-2 flex md:flex-row items-center">
          By {author} • {new Date(date).toLocaleDateString()} • {readingTime}
          <button>
            <Link
              href={`/blog/${title.toLowerCase().replace(/\s+/g, "-")}`}
              className=" inline-block text-[#2aa8fb] font-semibold border ml-3 px-2 py-1 rounded hover:bg-[#2aa8fb] hover:text-white  transition"
            >
              Read More
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

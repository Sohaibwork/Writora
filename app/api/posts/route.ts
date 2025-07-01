// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("your_db_name");
//     const posts = await db
//       .collection("posts")
//       .find({ status: "published" })
//       .sort({ date: -1 })
//       .toArray();

//     return NextResponse.json(
//       posts.map((post: any) => ({
//         _id: post._id.toString(),
//         title: post.title,
//         coverImage: post.coverImage,
//         author: post.author,
//         date: post.date,
//         readingTime: post.readingTime,
//         status: post.status,
//       }))
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }

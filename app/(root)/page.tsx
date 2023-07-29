import BlogCard from "@/components/ui/BlogCard";
import { Suspense } from "react";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(page: number) {
  const res = await fetch(
    `https://gorest.co.in/public/v2/posts?page=${page}&per_page=15`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      cache: "no-store",
      next: { revalidate: 0 },
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Post {
  id: number;
  title: string;
  user_id: number;
  body: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const posts = await getData(page);

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      <Suspense fallback={<Loading />}>
        <div className="mx-auto grid mt-10 max-w-2xl grid-cols-1 gap-x-8 gap-y-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts?.length == 0 ? (
            <div>No Result.</div>
          ) : (
            <>
              {posts.map((post: Post) => (
                <BlogCard data={post} key={post.id} />
              ))}
            </>
          )}
        </div>
      </Suspense>
      <div className="text-center mt-10 flex-row flex items-center justify-center gap-4">
        <Link
          href={`/?page=${page - 1 !== 0 && page - 1 !== 1 ? page - 1 : "1"}`}
        >
          <Button
            disabled={page < 0 || page == 1}
            className="w-[100px]"
            variant="outline"
          >
            Previous
          </Button>
        </Link>
        <Link href={`?page=${page + 1}`}>
          <Button className="w-[100px]" variant="outline">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

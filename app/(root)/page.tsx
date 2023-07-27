import BlogCard from "@/components/ui/BlogCard";

async function getData() {
  const res = await fetch("https://gorest.co.in/public/v2/posts");
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
  id: string;
  title: string;
  user_id: string;
  body: string;
}

export default async function Home() {
  const posts = await getData();

  return (
    <div className="w-4/6 mx-auto">
      <div className="mx-auto grid mt-10 max-w-2xl grid-cols-1 gap-x-8 gap-y-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post: Post) => (
          <BlogCard data={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

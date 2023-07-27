import BlogCard from "@/components/ui/BlogCard";
import getPosts from "../actions/getPosts";

interface Post {
  id: string;
  title: string;
  user_id: string;
  body: string;
}

export default async function Home() {
  const posts = await getPosts();

  console.log("posts data ", posts?.data);

  return (
    <div className="w-4/6 mx-auto">
      <div className="mx-auto grid mt-10 max-w-2xl grid-cols-1 gap-x-8 gap-y-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts?.data.map((post: Post) => (
          <BlogCard data={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

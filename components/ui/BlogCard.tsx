"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  user_id: number;
  body: string;
}

interface BlogCardProps {
  data: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/blog/${data.id}`)}
      className="cursor-pointer flex max-w-xl flex-col rounded-lg border p-6 items-start justify-between"
    >
      <div className="group relative">
        <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2    dark:text-white">
          <a href={`/blog/${data.id}`}>
            <span className="bg-gradient-to-r from-purple-200 to-purple-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
              {data.title}
            </span>
          </a>
        </h2>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {data.body}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img alt="" className="h-10 w-10 rounded-full bg-gray-400" />

        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a>
              <span className="absolute inset-0" />
              {/* {post.author.name} */}
              {data.user_id}
            </a>
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

import { Separator } from "@/components/ui/separator";
import { UserCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Comment {
  name: string;
  email: string;
  body: string;
  id: number;
  post_id: number;
}

async function getData(blogId: string) {
  const res = await fetch(`https://gorest.co.in/public/v2/posts/${blogId}`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getComments(blogId: string) {
  const res = await fetch(
    `https://gorest.co.in/public/v2/posts/${blogId}/comments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
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

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  const data = await getData(params.blogId);

  const comments = await getComments(params.blogId);

  console.log(data);
  console.log(comments);

  return (
    <div className="w-4/6 mx-auto">
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl ">
        {data.title}
      </h1>
      <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
        <p className="font-semibold text-gray-900">
          <a>
            <span className="" />
            User {data.user_id}
          </a>
        </p>
      </div>

      <article className="mx-auto max-w-screen-md mt-5">
        <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
          {data.body}
        </div>
      </article>

      <Separator className="mt-10" />
      <div className="mt-3">
        <p className="text-lg">Comments</p>
        {comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <div key={comment.id} className="mt-3">
              <Alert variant="default">
                <UserCircle className="h-4 w-4" />
                <AlertTitle>{comment.name}</AlertTitle>
                <AlertDescription>{comment.body}</AlertDescription>
              </Alert>
            </div>
          ))
        ) : (
          <p>Comment not found</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;

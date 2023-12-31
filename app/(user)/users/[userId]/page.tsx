import BlogCard from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EditIcon, PlusSquare } from "lucide-react";
import { Suspense } from "react";
import LoadingUsers from "./loading";

async function getUser(userId: string) {
  const res = await fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    cache: "no-cache" || "no-store",
    next: { revalidate: 0 },
  });

  return res.json();
}

async function getUserPost(userId: string) {
  const res = await fetch(
    `https://gorest.co.in/public/v2/users/${userId}/posts`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      cache: "no-cache" || "no-store",
      next: { revalidate: 0 },
    }
  );

  return res.json();
}

export type User = {
  id: number;
  name: string;
  gender: string;
  status: string;
  email: string;
};

export type Blog = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

const UserDetailPage = async ({ params }: { params: { userId: string } }) => {
  // Get individual user by params
  const user = await getUser(params.userId);

  const posts = await getUserPost(params.userId);

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      <Suspense fallback={<LoadingUsers />}>
        {!user.message ? (
          <div>
            <div className="lg:flex gap-3">
              <div className="w-full lg:w-[365px]">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Id: {user.id}</p>
                    <p className="capitalize">
                      Status:{" "}
                      <span className="font-semibold">{user.status}</span>
                    </p>
                    <p className="capitalize">
                      Gender:{" "}
                      <span className="font-semibold">{user.gender}</span>
                    </p>
                  </CardContent>
                  <CardFooter className="flex-col gap-2">
                    <a href={`/users/${user.id}/edit`} className="w-full">
                      <Button variant="default" className="w-full">
                        <EditIcon className="h-4 w-4 mr-2" />
                        Update User
                      </Button>
                    </a>
                    {/* <Button variant="destructive" className="w-full">
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete User
                  </Button> */}
                  </CardFooter>
                </Card>
              </div>
              <div className="lg:w-full mt-3 lg:mt-0">
                <div className="md:flex justify-between">
                  <p className="text-xl font-bold">
                    Blogs written by {user.name}
                  </p>
                  <a href={`/users/${user.id}/create-blog`}>
                    <Button
                      variant="outline"
                      className="w-full md:w-auto mt-2 md:mt-0"
                    >
                      <PlusSquare className="h-4 w-4 mr-2" /> Create New Blog
                    </Button>
                  </a>
                </div>

                {posts.length ? (
                  <>
                    {posts.map((post: Blog) => (
                      <Card key={post.id} className="p-2 mt-3">
                        <BlogCard data={post} key={post.id} />
                      </Card>
                    ))}
                  </>
                ) : (
                  <> Looks like {user.name} have not write any blog </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>User Not Found</div>
        )}
      </Suspense>
    </div>
  );
};

export default UserDetailPage;

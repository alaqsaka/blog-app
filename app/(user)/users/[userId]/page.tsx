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
import { EditIcon, PlusSquare, TrashIcon } from "lucide-react";

async function getUser(userId: string) {
  const res = await fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  //   console.log("[GET_USER]", res);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors

  return res.json();
}

async function getUserPost(userId: string) {
  const res = await fetch(
    `https://gorest.co.in/public/v2/users/${userId}/posts`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );

  //   console.log("[GET_USER]", res);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors

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
                    Status: <span className="font-semibold">{user.status}</span>
                  </p>
                  <p className="capitalize">
                    Gender: <span className="font-semibold">{user.gender}</span>
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button variant="default" className="w-full">
                    <EditIcon className="h-4 w-4 mr-2" />
                    Update User
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete User
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="lg:w-full mt-3 lg:mt-0">
              <div className="flex justify-between">
                <p className="text-xl font-bold">
                  Blogs written by {user.name}
                </p>
                <Button variant="outline">
                  <PlusSquare className="h-4 w-4 mr-2" /> Create New Post
                </Button>
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
    </div>
  );
};

export default UserDetailPage;

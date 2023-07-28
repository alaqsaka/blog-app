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

  console.log("[GET_USER]", res);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export type User = {
  id: number;
  name: string;
  gender: string;
  status: string;
  email: string;
};

const UserDetailPage = async ({ params }: { params: { userId: string } }) => {
  // Get individual user by params
  const user: User = await getUser(params.userId);

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
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
            </CardFooter>
          </Card>
        </div>
        <div className="bg-slate-500 lg:w-full">Blogs written by Megumi</div>
      </div>
    </div>
  );
};

export default UserDetailPage;

import React, { Suspense } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import LoadingUsers from "./loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getUsersData(page: number) {
  const res = await fetch(
    `https://gorest.co.in/public/v2/users?page=${page}&per_page=15`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      cache: "no-cache" || "no-store",
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

interface User {
  name: string;
  id: number;
  email: string;
  gender: string;
  status: string;
}

const UserPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const page = parseInt(searchParams.page) || 1;
  const users = await getUsersData(page);

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      <Suspense fallback={<LoadingUsers />}>
        <DataTable columns={columns} data={users} />
      </Suspense>

      <div className="text-center mt-10 flex-row flex items-center justify-center gap-4">
        <Link
          href={`/users?page=${
            page - 1 !== 0 && page - 1 !== 1 ? page - 1 : "1"
          }`}
        >
          <Button
            disabled={page < 0 || page == 1}
            className="w-[100px]"
            variant="outline"
          >
            Previous
          </Button>
        </Link>
        <Link href={`/users?page=${page + 1}`}>
          <Button className="w-[100px]" variant="outline">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserPage;

import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

async function getUsersData() {
  const res = await fetch(`https://gorest.co.in/public/v2/users`, {
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

interface User {
  name: string;
  id: number;
  email: string;
  gender: string;
  status: string;
}

const UserPage = async () => {
  const users = await getUsersData();

  console.log("data", users);

  return (
    <div className="w-4/6 mx-auto">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UserPage;

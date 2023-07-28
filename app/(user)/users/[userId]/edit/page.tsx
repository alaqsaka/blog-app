import React from "react";
import UserForm from "../../components/user-form";

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

const UserEditPage = async ({ params }: { params: { userId: string } }) => {
  // Get individual user by params
  const user = await getUser(params.userId);

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      <UserForm initialData={user} />
    </div>
  );
};

export default UserEditPage;

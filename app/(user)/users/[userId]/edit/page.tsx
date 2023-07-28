import React from "react";
import UserForm from "../../components/user-form";

const UserEditPage = ({ params }: { params: { userId: string } }) => {
  // Get individual user by params
  const user = null;

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      {params.userId}
      <UserForm initialData={user} />
    </div>
  );
};

export default UserEditPage;

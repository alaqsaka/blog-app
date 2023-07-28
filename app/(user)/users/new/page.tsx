"use client";

import React from "react";
import UserForm from "../components/user-form";

// TODO: Create new user

const NewUserPage = () => {
  const user = null;

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      <p className="text-xl font-bold">Create New User</p>

      <UserForm initialData={user} />
    </div>
  );
};

export default NewUserPage;

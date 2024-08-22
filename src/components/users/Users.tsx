"use client";
import React, { useState } from "react";

import UsersList from "@/components/users/UsersList";
import { User } from "@prisma/client";
import UserModal from "@/components/users/UserModal";
import { createUser } from "@/actions/users";

const Users = ({ users }: { users: User[] }) => {
  return (
    <div className="mt-9 flex flex-col gap-5">
      <UserModal actionName="create" trigger="Створити користувача" />
      <UsersList users={users} />
    </div>
  );
};

export default Users;

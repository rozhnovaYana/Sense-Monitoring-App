import React from "react";

import { getAllUsers } from "@/db/queries/users";
import Users from "@/components/users/Users";

const AdminPage = async () => {
  const users = await getAllUsers();
  return <Users users={users} />;
};

export default AdminPage;

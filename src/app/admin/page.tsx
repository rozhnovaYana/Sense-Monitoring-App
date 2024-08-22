import UserForm from "@/components/users/UserForm";
import UsersList from "@/components/users/UsersList";
import { getAllUsers } from "@/db/queries/users";
import React from "react";

type Props = {};

const AdminPage = async (props: Props) => {
  // 1. show all users
  // 2. add an ability to add/remove/efit user

  const users = await getAllUsers();
  if (!users || users.length === 0) {
    return <div>Користувачів не знайдено.</div>;
  }
  return (
    <>
      <UsersList users={users} />
    </>
  );
};

export default AdminPage;

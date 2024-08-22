"use client";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { User } from "@prisma/client";
import React from "react";
import UserForm from "./UserForm";

type UsersListProps = {
  users: User[];
};

const UsersList = ({ users }: UsersListProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="grid grid-cols-3 gap-5 mt-6">
        {users.map((user) => (
          <Card key={user.id} className="w-full" isPressable>
            <CardBody>
              <div className="flex justify-between">
                <div>{user.name}</div>
                <div className="text-gray-500 text-xs">{user.login}</div>
              </div>
              <div
                className={`text-small ${
                  user.role.toLowerCase() === "admin"
                    ? "text-success"
                    : "text-primary"
                }`}
              >
                {user.role}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default UsersList;

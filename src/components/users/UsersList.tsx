"use client";

import React, { Key, useCallback } from "react";
import { User as UserType } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import ConfirmModal from "@/components/UI/ConfirmModal";
import UserModal from "@/components/users/UserModal";
import { DeleteIcon, EditIcon } from "@/components/icons/Icons";

import { sortDescriptors, userFields } from "@/data/user";
import { deleteUser } from "@/actions/users";

type UsersListProps = {
  users: UserType[];
};

const UsersList = ({ users }: UsersListProps) => {
  const renderCell = useCallback((user: UserType, columnKey: Key) => {
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-end">
            {user.role === "USER" && (
              <ConfirmModal
                triggerIcon={<DeleteIcon />}
                className="text-lg text-danger cursor-pointer active:opacity-50"
                headerText={`Ви впевнені, що хочете видалити користувача ${user.login}?`}
                onSave={() => deleteUser(user.id)}
                type="submit"
                confirmButtonText="Видалити"
              />
            )}
            <UserModal
              actionName="edit"
              user={user}
              isIconOnly
              variant="bordered"
              size="sm"
              className="text-lg text-primary cursor-pointer active:opacity-50"
              trigger={<EditIcon />}
            />
          </div>
        );
      default:
        return user[columnKey as keyof UserType] || "";
    }
  }, []);
  return (
    <Table
      aria-label="Example table with client side sorting"
      classNames={{
        table: "min-h-[100px]",
      }}
      isStriped
    >
      <TableHeader>
        {sortDescriptors.map((i) => (
          <TableColumn key={i} width={i === "actions" ? "20" : "33%"}>
            {i == "actions" ? "" : userFields[i] || i}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id} className="bg-gradient-radial">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersList;

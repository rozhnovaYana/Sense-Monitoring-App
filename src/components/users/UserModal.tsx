"use client";
import React, { ReactNode, useEffect } from "react";

import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import ButtonUI from "@/components/UI/Button";
import CustomInput from "../UI/Input";
import { createUser } from "@/actions/users";
import { createUserState } from "@/types/FormStates";
import { useFormState } from "react-dom";
import { Role, User } from "@prisma/client";

interface UserModalProps extends ButtonProps {
  actionName: "create" | "edit";
  trigger: string | ReactNode;
  user?: User;
}

const roles: Role[] = ["ADMIN", "USER"];

const UserModal = ({ actionName, trigger, user, ...props }: UserModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [formState, formAction] = useFormState(
    createUser.bind(null, actionName),
    {
      errors: {},
      isSuccess: false,
    }
  );

  useEffect(() => {
    formState.isSuccess && onClose();
  }, [formState.isSuccess, onClose]);

  return (
    <div>
      <ButtonUI variant="bordered" onClick={onOpen} {...props}>
        {trigger}
      </ButtonUI>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader>Створити користувача</ModalHeader>
              <ModalBody>
                <CustomInput
                  isInvalid={!!formState.errors.name}
                  errorMessage={formState.errors.name?.join(", ")}
                  label="Ім'я та Прізвище"
                  name="name"
                  variant="bordered"
                  defaultValue={user?.name}
                />
                <CustomInput
                  label="Логін"
                  name="login"
                  isInvalid={!!formState.errors.login}
                  errorMessage={formState.errors.login?.join(", ")}
                  variant="bordered"
                  defaultValue={user?.login}
                />
                <Select
                  isInvalid={!!formState.errors.role}
                  errorMessage={formState.errors.role?.join(", ")}
                  defaultSelectedKeys={user?.role ? [user.role] : ["user"]}
                  label="Роль"
                  name="role"
                  variant="bordered"
                >
                  {roles.map((role, index) => (
                    <SelectItem key={role}>{role}</SelectItem>
                  ))}
                </Select>
                {formState?.errors._form && (
                  <div className="text-danger">{formState?.errors._form}</div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" color="danger" onClick={onClose}>
                  Скасувати
                </Button>
                <ButtonUI variant="bordered" color="success" type="submit">
                  Зберегти
                </ButtonUI>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserModal;

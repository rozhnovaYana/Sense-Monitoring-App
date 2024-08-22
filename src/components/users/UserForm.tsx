"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type UserFormProps = {
  headerText: string;
};

const UserForm = ({ headerText }: UserFormProps) => {
  return (
    <Modal>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{headerText}</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserForm;

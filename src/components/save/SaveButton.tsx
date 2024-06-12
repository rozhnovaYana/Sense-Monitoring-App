import React from "react";
import { FaSave } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ButtonProps,
} from "@nextui-org/react";
import ButtonUI from "../UI/Button";

interface SaveButtonProps extends ButtonProps {
  onSave: () => void;
}

const SaveButton = ({ onSave, ...props }: SaveButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ButtonUI {...props} onClick={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Зберегти повідомлення?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Скасувати
                </Button>
                <Button
                  color="success"
                  onPress={() => {
                    onSave();
                    onClose();
                  }}
                >
                  Зберегти
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaveButton;

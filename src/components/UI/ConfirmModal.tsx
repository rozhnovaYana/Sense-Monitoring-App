import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ButtonProps,
} from "@nextui-org/react";
import IconButton from "@/components/UI/IconButton";

interface ConfirmButtonProps extends ButtonProps {
  onSave: () => void;
  headerText: string;
  confirmButtonText?: string;
  triggerIcon?: ReactNode;
}

const ConfirmModal = ({
  onSave,
  headerText,
  confirmButtonText,
  triggerIcon,
  ...props
}: ConfirmButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} isIconOnly {...props}>
        {triggerIcon}
      </IconButton>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {headerText}
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
                  {confirmButtonText || "Зберегти"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;

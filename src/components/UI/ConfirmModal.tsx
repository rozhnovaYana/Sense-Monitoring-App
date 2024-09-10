import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ButtonProps,
  Tooltip,
} from "@nextui-org/react";
import IconButton from "@/components/UI/IconButton";

interface ConfirmButtonProps extends ButtonProps {
  onSave: () => void;
  headerText: string;
  confirmButtonText?: string;
  triggerIcon?: ReactNode;
  title: string;
}

const ConfirmModal = ({
  onSave,
  headerText,
  confirmButtonText,
  triggerIcon,
  title,
  ...props
}: ConfirmButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content={title}>
        <Button onClick={onOpen} className="min-w-0" {...props}>
          {triggerIcon}
        </Button>
      </Tooltip>
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

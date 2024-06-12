import React from "react";
import { FaSave } from "react-icons/fa";
import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const ButtonUI = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="ghost"
      isIconOnly
      className="mt-4"
      isLoading={pending}
      {...props}
    >
      <FaSave />
    </Button>
  );
};

export default ButtonUI;

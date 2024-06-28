"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@nextui-org/react";

const ButtonUI = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} {...props}>
      {children}
    </Button>
  );
};

export default ButtonUI;

import React from "react";

import { Button, ButtonProps } from "@nextui-org/react";

const IconButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="bordered" isIconOnly size="sm" {...props}>
      {children}
    </Button>
  );
};

export default IconButton;

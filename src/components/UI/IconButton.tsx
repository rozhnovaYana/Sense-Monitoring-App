import React from "react";

import { Button, ButtonProps } from "@nextui-org/react";

const IconButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="bordered" size="sm" isIconOnly {...props}>
      {children}
    </Button>
  );
};

export default IconButton;

import React from "react";
import { Input, InputProps } from "@nextui-org/react";

const CustomInput = ({ ...props }: InputProps) => {
  return (
    <Input
      type="text"
      isClearable
      {...props}
    />
  );
};

export default CustomInput;

import React from "react";
import { Input, InputProps } from "@nextui-org/react";
const SearchMessage = (props: InputProps) => {
  return (
    <Input
      isClearable
      label="Шукати"
      variant="bordered"
      className="mt-8"
      {...props}
    />
  );
};

export default SearchMessage;

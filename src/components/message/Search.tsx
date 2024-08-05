"use client";
import React from "react";
import { Input, InputProps } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import { searchMessage } from "@/actions/search-messages";

const SearchMessage = (props: InputProps) => {
  const params = useSearchParams();
  const term = params.get("term");
  return (
    <Input
      isClearable
      label="Шукати"
      variant="bordered"
      className="mt-8"
      defaultValue={term || ""}
      onValueChange={searchMessage}
      {...props}
    />
  );
};

export default SearchMessage;

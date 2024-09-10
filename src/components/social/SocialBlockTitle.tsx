import { Chip, ChipProps } from "@nextui-org/react";
import React from "react";

const SocialBlockTitle = ({ children, ...props }: ChipProps) => {
  return (
    <Chip variant="flat" {...props}>
      {children}
    </Chip>
  );
};

export default SocialBlockTitle;

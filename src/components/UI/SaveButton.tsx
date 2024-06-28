import { FaSave } from "react-icons/fa";
import ButtonUI from "@/components/UI/Button";
import { ButtonProps } from "@nextui-org/react";

const SaveButton = (props: ButtonProps) => {
  return (
    <ButtonUI
      {...props}
      variant="ghost"
      isIconOnly
      className="mt-4 items-center"
      type="submit"
    >
      <FaSave />
    </ButtonUI>
  );
};

export default SaveButton;

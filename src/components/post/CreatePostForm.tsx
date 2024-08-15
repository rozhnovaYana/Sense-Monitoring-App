"use client";

import React from "react";
import { useFormState } from "react-dom";
import { Textarea } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";

import ButtonUI from "@/components/UI/Button";
import { createPost } from "@/actions/posts";

const CreatePostForm = () => {
  const [formState, action] = useFormState(createPost, {
    errors: {},
  });
  return (
    <form className="mt-10" action={action}>
      <Textarea
        variant="bordered"
        placeholder="Повідомлення"
        name="content"
        isInvalid={!!formState.errors.content}
        errorMessage={formState.errors.content?.join(", ")}
        endContent={
          <ButtonUI
            size="sm"
            isIconOnly
            className="items-center mt-auto"
            type="submit"
          >
            <IoIosSend />
          </ButtonUI>
        }
      />

      <div className="p-2 rounded text-danger-50">{formState.errors._form}</div>
    </form>
  );
};

export default CreatePostForm;

"use client";

import React, { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Textarea } from "@nextui-org/react";

import { SendIcon } from "@/components/icons/Icons";
import IconButton from "@/components/UI/IconButton";

import { createPost } from "@/actions/posts";

const CreatePostForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [formState, action] = useFormState(createPost, {
    errors: {},
    isSuccess: false,
  });
  useEffect(() => {
    formState.isSuccess && ref.current?.reset();
  }, [formState.isSuccess]);

  return (
    <form ref={ref} action={action}>
      <Textarea
        label="Нове повідомлення"
        variant="bordered"
        name="content"
        isInvalid={!!formState.errors.content}
        minRows={1}
        errorMessage={formState.errors.content?.join(", ")}
        endContent={
          <IconButton
            size="sm"
            isIconOnly
            className="items-center mt-auto"
            type="submit"
            variant="light"
          >
            <SendIcon />
          </IconButton>
        }
      />

      <div className="p-2 rounded text-danger-50">{formState.errors._form}</div>
    </form>
  );
};

export default CreatePostForm;

"use client";

import React, { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import CustomInput from "@/components/UI/Input";
import IconButton from "@/components/UI/IconButton";
import { SendIcon } from "@/components/icons/Icons";

import { createComment } from "@/actions/comment";

type CommentCreateFormProps = {
  id: string;
};

const CommentCreateForm = ({ id }: CommentCreateFormProps) => {
  const [formState, action] = useFormState(createComment, {
    errors: {},
    isSuccess: false,
  });
  const createCommentRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.isSuccess) {
      createCommentRef.current?.reset();
    }
  }, [formState]);

  return (
    <form className="mt-6" action={action} ref={createCommentRef}>
      <CustomInput
        isClearable={false}
        isInvalid={!!formState.errors.content}
        errorMessage={formState.errors.content}
        placeholder="Коментувати"
        name="content"
        variant="bordered"
        endContent={
          <IconButton type="submit" variant="light">
            <SendIcon />
          </IconButton>
        }
      />
      <input hidden name="postId" value={id} />
      {formState.errors._form ? (
        <div className="p-2 bg-red-200 border rounded border-red-400">
          {formState.errors._form}
        </div>
      ) : null}
    </form>
  );
};

export default CommentCreateForm;

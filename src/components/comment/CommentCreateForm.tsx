"use client";

import React from "react";
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
  });

  return (
    <form className="mt-6" action={action}>
      <CustomInput
        isClearable={false}
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

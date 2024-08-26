"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Textarea } from "@nextui-org/react";

import ConfirmModal from "@/components/UI/ConfirmModal";
import ButtonUI from "@/components/UI/Button";
import { DeleteIcon, EditIcon, SaveIcon } from "@/components/icons/Icons";

import { useDateFormatter } from "@/hooks/useDateFormatter";
import { createDiscussState } from "@/types/FormStates";

type DiscussCardProps = {
  content: string;
  userName: string;
  updatedAt: Date;
  postCreatedByActiveUser: boolean;
  id: string;
  formAction: (
    state: createDiscussState,
    formData: FormData
  ) => Promise<createDiscussState>;
  onDeleteItem: (id: string) => void;
  className?: string;
  postId?: string;
};

const DiscussCard = ({
  content,
  updatedAt,
  userName,
  postCreatedByActiveUser,
  id,
  formAction,
  onDeleteItem,
  className,
  postId,
}: DiscussCardProps) => {
  const [editState, setEditState] = useState(false);
  const [formState, action] = useFormState(formAction, {
    errors: {},
    isSuccess: false,
  });

  let formatter = useDateFormatter();
  const convertData = (data: Date) => formatter.format(data);

  const onEditPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (editState) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    } else {
      setEditState((s) => !s);
    }
  };

  useEffect(() => {
    Object.keys(formState.errors).length === 0 && setEditState((s) => !s);
  }, [formState]);

  return (
    <div className={className}>
      <form action={action} className="w-full">
        <div className="flex justify-between">
          <div>
            <span className="text-gray-500 text-xs mr-2">{userName}</span>
            <span className=" text-gray-500 italic text-xs">
              {convertData(updatedAt)}
            </span>
          </div>

          {postCreatedByActiveUser && (
            <div>
              <ConfirmModal
                headerText="Видалити повідомлення?"
                confirmButtonText="Так"
                onSave={() => onDeleteItem(id)}
                triggerIcon={<DeleteIcon />}
                color="danger"
                variant="light"
                size="sm"
              />
              <ButtonUI
                color={editState ? "success" : "primary"}
                onClick={onEditPost}
                variant="light"
                size="sm"
                isIconOnly
              >
                {editState ? <SaveIcon /> : <EditIcon />}
              </ButtonUI>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between w-full">
          {!editState ? (
            <span className="flex-grow text-left">{content}</span>
          ) : (
            <>
              <Textarea
                placeholder="Повідомлення"
                name="content"
                fullWidth
                defaultValue={content}
                isInvalid={!!formState.errors.content}
                errorMessage={formState.errors.content?.join(", ")}
              />
              <input hidden name="id" value={id} />
              {postId && <input hidden name="postId" value={postId} />}
              <div className="p-2 rounded text-danger-50">
                {formState.errors._form}
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default DiscussCard;

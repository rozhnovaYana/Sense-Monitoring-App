"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";

import ConfirmModal from "@/components/UI/ConfirmModal";
import ButtonUI from "@/components/UI/Button";
import { DeleteIcon, EditIcon, SaveIcon } from "@/components/icons/Icons";

import { useDateFormatter } from "@/hooks/useDateFormatter";
import { createDiscussState } from "@/types/FormStates";
import { DeleteState } from "@/types/ActionState";

import locales from "@/locales/ua.json";

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
  onDeleteItem: (id: string) => Promise<DeleteState>;
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

  const onDelete = async () => {
    try {
      const data = await onDeleteItem(id);
      if (data.isSuccess && !data.error) {
        toast.success("Коментар було видалено.");
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error(locales.common_issue);
    }
  };

  useEffect(() => {
    if (formState.isSuccess) {
      setEditState((s) => !s);
    }
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
                onSave={onDelete}
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
            <span className="flex-grow text-left whitespace-pre-wrap">{content}</span>
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

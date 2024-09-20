import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

import { SocialItem, socialItems } from "@/data/socialdata";
import SocialBlock from "@/components/social/SocialBlock";

import { FormState } from "@/types/Form";
import { ActionState } from "@/types/ActionState";

type SocialBlocksProps = {
  formState: FormState;
  node: HTMLDivElement | null;
  updateFormState: Dispatch<SetStateAction<FormState>>;
};
export type DeleteActionState = (
  data: FormState,
  key: keyof FormState,
  variableKey: string
) => Promise<
  ActionState & {
    formState?: FormState;
  }
>;

export type SaveActionState = (
  data: FormState,
  formattedMessage: string,
  key: keyof FormState,
  variableKey?: string
) => Promise<ActionState & { formState?: FormState }>;

const SocialBlocks = ({
  formState,
  node,
  updateFormState,
}: SocialBlocksProps) => {
  const sendMessage = async (item: SocialItem) => {
    const formattedMessage = node?.innerText;
    console.log(formattedMessage);
    if (!formattedMessage) return;
    const resp = await item.saveAction(
      formState,
      formattedMessage,
      item.id,
      item?.variableKey
    );
    if (resp.isSuccess && !resp.error && resp.formState) {
      toast.success("Повідомлення було надіслано");
      updateFormState(resp.formState);
    } else {
      toast.error(resp.error);
    }
  };
  const deleteMessage = async (item: SocialItem) => {
    if (!item.deleteAction || !item.variableKey) return;
    const resp = await item.deleteAction(formState, item.id, item.variableKey);
    if (resp.isSuccess && !resp.error && resp.formState) {
      toast.success("Повідомлення було видалено");
      updateFormState(resp.formState);
    } else {
      toast.error(resp.error);
    }
  };

  const newItems: SocialItem[] = [];
  const sendItems = socialItems.reduce((acc: SocialItem[], item, index) => {
    const id = item.id;
    const itemSended = formState?.[id];
    if (itemSended && item.deleteAction) {
      acc.push(item);
    }
    if (!itemSended) {
      newItems.push(item);
    }
    return acc;
  }, []);

  return (
    <div className="flex gap-4 flex-col py-4">
      <SocialBlock
        titleColor="primary"
        titleText="Надіслати"
        items={newItems}
        action={(item) => {
          sendMessage(item);
        }}
      />
      {sendItems && (
        <SocialBlock
          titleColor="warning"
          titleText="Редагувати"
          items={sendItems}
          action={(item) => {
            sendMessage(item);
          }}
        />
      )}

      {sendItems && (
        <SocialBlock
          titleColor="danger"
          titleText="Видалити"
          items={sendItems}
          action={(item) => {
            deleteMessage(item);
          }}
        />
      )}
    </div>
  );
};

export default SocialBlocks;

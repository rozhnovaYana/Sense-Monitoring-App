import React, { useState } from "react";
import { toast } from "react-toastify";

import { SocialItem, socialItems } from "@/data/socialdata";
import SocialBlock from "@/components/social/SocialBlock";

import { FormState } from "@/types/Form";
import { ActionState } from "@/types/ActionState";

type SocialBlocksProps = {
  formState: FormState;
  node: HTMLDivElement | null;
};
export type DeleteActionState = (data: FormState) => Promise<
  ActionState & {
    formState?: FormState;
  }
>;

export type SaveActionState = (
  data: FormState,
  formattedMessage: string
) => Promise<ActionState & { formState?: FormState }>;

const SocialBlocks = ({ formState, node }: SocialBlocksProps) => {
  const [state, setState] = useState(formState);

  const sendMessage = async (action: SaveActionState) => {
    const formattedMessage = node?.innerText;
    if (!formattedMessage) return;
    const resp = await action(state, formattedMessage);
    if (resp.isSuccess && !resp.error && resp.formState) {
      toast.success("Повідомлення було надіслано");
      setState(resp.formState);
    } else {
      toast.error(resp.error);
    }
  };
  const deleteMessage = async (action: DeleteActionState) => {
    const resp = await action(state);
    if (resp.isSuccess && !resp.error && resp.formState) {
      toast.success("Повідомлення було видалено");
      setState(resp.formState);
    } else {
      toast.error(resp.error);
    }
  };

  const newItems: SocialItem[] = [];
  const sendItems = socialItems.reduce((acc: SocialItem[], item, index) => {
    const id = item.id;
    const itemSended = state?.[id];
    if (itemSended) {
      acc.push(item);
    } else {
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
          sendMessage(item.saveAction);
        }}
      />
      {sendItems && (
        <SocialBlock
          titleColor="warning"
          titleText="Редагувати"
          items={sendItems}
          action={(item) => {
            sendMessage(item.saveAction);
          }}
        />
      )}

      {sendItems && (
        <SocialBlock
          titleColor="danger"
          titleText="Видалити"
          items={sendItems}
          action={(item) => {
            deleteMessage(item.deleteAction);
          }}
        />
      )}
    </div>
  );
};

export default SocialBlocks;

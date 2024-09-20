import React from "react";
import { Divider } from "@nextui-org/react";
import { SocialItem } from "@/data/socialdata";
import ConfirmModal from "@/components/UI/ConfirmModal";
import SocialBlockTitle from "@/components/social/SocialBlockTitle";
import { ButtonColors } from "@/types/Colors";

type SocialBlockProps = {
  titleColor: ButtonColors;
  titleText: string;
  items: SocialItem[];
  action: (item: SocialItem) => void;
};

const SocialBlock = ({
  titleColor,
  titleText,
  items,
  action,
}: SocialBlockProps) => {
  if (!items.length) return null;
  return (
    <>
      <Divider />
      <SocialBlockTitle color={titleColor}>{titleText}</SocialBlockTitle>
      <div className="flex gap-4">
        {items?.map((item) => {
          const Icon = item.icon;
          return (
            <ConfirmModal
              key={item.id}
              title={item.title}
              color={item.color}
              triggerIcon={<Icon />}
              headerText={`Надіслати повідомлення до ${item.title}?`}
              onSave={() => action(item)}
              type="submit"
              variant="ghost"
            />
          );
        })}
      </div>
    </>
  );
};

export default SocialBlock;

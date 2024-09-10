import { TelegramIcon, WebexIcon } from "@/components/icons/Icons";
import { FormState } from "@/types/Form";
import { deleteFromTelegram, sendToTelegram } from "@/actions/messages";
import { ActionState } from "@/types/ActionState";
import { ButtonColors } from "@/types/Colors";

export type SocialItem = {
  id: keyof FormState;
  icon: () => React.JSX.Element;
  saveAction: (
    data: FormState,
    formattedMessage: string
  ) => Promise<ActionState>;
  deleteAction: (data: FormState) => Promise<
    ActionState & {
      formState?: FormState;
    }
  >;
  color: ButtonColors;
  title: string;
};
export const socialItems: SocialItem[] = [
  {
    id: "telegramId",
    icon: TelegramIcon,
    color: "primary",
    saveAction: sendToTelegram,
    deleteAction: deleteFromTelegram,
    title: "Telegram",
  },
  {
    id: "webexCSId",
    icon: WebexIcon,
    color: "warning",
    saveAction: sendToTelegram,
    deleteAction: deleteFromTelegram,
    title: "Webex CS",
  },
  {
    id: "webexAlertId",
    icon: WebexIcon,
    color: "secondary",
    saveAction: sendToTelegram,
    deleteAction: deleteFromTelegram,
    title: "Webex Alert",
  },
];

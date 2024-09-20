import { MailIcon, TelegramIcon, WebexIcon } from "@/components/icons/Icons";
import { FormState } from "@/types/Form";

import { ButtonColors } from "@/types/Colors";
import { deleteFromTelegram, sendToTelegram } from "@/actions/telegram";
import { deleteFromWebex, sendToWebex } from "@/actions/webex";
import {
  DeleteActionState,
  SaveActionState,
} from "@/components/social/SocialBlocks";
import { sendToMail } from "@/actions/mail";

export type SocialItem = {
  id: keyof FormState;
  icon: () => React.JSX.Element;
  saveAction: SaveActionState;
  deleteAction?: DeleteActionState;
  color: ButtonColors;
  title: string;
  variableKey?: string;
};

export const socialItems: SocialItem[] = [
  // {
  //   id: "telegramId",
  //   icon: TelegramIcon,
  //   color: "primary",
  //   saveAction: sendToTelegram,
  //   deleteAction: deleteFromTelegram,
  //   title: "Telegram",
  //   variableKey: "TELEGRAM_CHAT_ID",
  // },
  {
    id: "webexCSId",
    icon: WebexIcon,
    color: "warning",
    saveAction: sendToWebex,
    deleteAction: deleteFromWebex,
    title: "Webex CS",
    variableKey: "WEBEX_CS_ROOM_ID",
  },
  {
    id: "webexAlertId",
    icon: WebexIcon,
    color: "secondary",
    saveAction: sendToWebex,
    deleteAction: deleteFromWebex,
    title: "Webex Alert",
    variableKey: "WEBEX_ALERT_ROOM_ID",
  },
  {
    id: "mailId",
    icon: MailIcon,
    color: 'default',
    saveAction: sendToMail,
    title: "Mail",
  },
];

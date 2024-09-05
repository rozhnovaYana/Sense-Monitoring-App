import React, { useEffect, useRef, useState } from "react";
import { FormState } from "@/types/Form";

import { toast } from "react-toastify";

import { levels } from "@/data/formdata";
import { getTimeDifference } from "@/utils/dateHelpers";
import { saveMessage } from "@/actions/messages";

import { useDateFormatter } from "@/hooks/useDateFormatter";
import ConfirmModal from "@/components/UI/ConfirmModal";
import IconButton from "@/components/UI/IconButton";
import {
  EditIcon,
  SaveIcon,
  CopyIcon,
  CopyMdIcon,
  SendIcon,
} from "@/components/icons/Icons";
import { getIncidentByNumber } from "@/db/queries/incidents";
import { FaTelegram } from "react-icons/fa";

type MessageProps = {
  formState: FormState;
};

const Message = ({ formState }: MessageProps) => {
  const {
    level,
    theme,
    isResolved,
    numberOfIncident,
    numberOfMessage,
    startDate,
    endDate,
    reasons,
    activities,
  } = formState;
  const node = useRef<HTMLDivElement>(null);
  const [isCopied, setCopied] = useState(false);
  const [isIncidentExist, setIncidentExist] = useState(false);

  let formatter = useDateFormatter();
  const convertData = (data: Date) => formatter.format(data);

  const timeDifference = endDate && getTimeDifference(startDate, endDate);

  useEffect(() => {
    if (numberOfIncident?.trim() === "") setIncidentExist(false);
    (async () => {
      const inc = await getIncidentByNumber(numberOfIncident);
      inc ? setIncidentExist(true) : setIncidentExist(false);
    })();
  }, [numberOfIncident]);

  const onCopyText = async () => {
    if (node.current) {
      setCopied(false);
      if (navigator.clipboard) {
        const content = node.current.innerText;
        await navigator.clipboard.writeText(content);
        setCopied(true);
      } else {
        toast.error(
          "На жаль, налаштування вашого браузера не дозволяють виконати цю дію."
        );
      }
    }
  };

  const onSave = async () => {
    const newMessage = {
      ...formState,
      startDate: startDate,
      endDate: endDate,
    };
    const data = await saveMessage(newMessage);

    data.isSuccess && !data.error
      ? toast.success("Повідомлення успішно збережено.")
      : toast.error(data.error);
  };

  return (
    <>
      <div ref={node} style={{ whiteSpace: "pre-wrap" }}>
        <div>
          Рівень впливу:
          <span
            className={`text-${
              levels.find((l) => l.text === level)?.color
            } capitalize`}
          >
            {" "}
            {level}
          </span>{" "}
        </div>
        <div>Шановні Колеги!</div>
        <div>{theme}</div>
        {reasons && <div>Причини: {reasons}</div>}
        {activities && <div>Вжиті заходи: {activities}</div>}
        <div>
          Час початку:
          <span className="text-success-700"> {convertData(startDate)}</span>
        </div>

        <div>
          {isResolved ? "Час завершення:" : "Очікуванний час завершення:"}{" "}
          <span className="text-success-700">
            {endDate ? convertData(endDate) : "уточнюється"}
          </span>
        </div>
        {isResolved && timeDifference && (
          <div>Тривалість: {timeDifference}</div>
        )}

        <div>Повідомлення №: {numberOfMessage}</div>
        <div className="text-success-700">{numberOfIncident}</div>
      </div>
      <div className="flex gap-3">
        <ConfirmModal
          color="success"
          triggerIcon={isIncidentExist ? <EditIcon /> : <SaveIcon />}
          className="mt-4 items-center"
          headerText="Зберегти повідомлення?"
          onSave={onSave}
          type="submit"
          variant="ghost"
        />
        {/* <ConfirmModal
          color="success"
          triggerIcon={<FaTelegram />}
          className="mt-4 items-center"
          headerText="Зберегти повідомлення?"
          onSave={onSave}
          type="submit"
          variant="ghost"
        />
        <ConfirmModal
          color="success"
          triggerIcon={<SendIcon />}
          className="mt-4 items-center"
          headerText="Зберегти повідомлення?"
          onSave={onSave}
          type="submit"
          variant="ghost"
        /> */}
      </div>
      <div className="text-sm text-danger mt-2">
        {isIncidentExist &&
          "Такий номер інциденту вже існує, тому при повторному збереженні дані будуть перезаписані."}
      </div>
    </>
  );
};

export default Message;

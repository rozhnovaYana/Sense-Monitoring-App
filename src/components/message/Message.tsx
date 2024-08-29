import React, { useEffect, useRef, useState } from "react";
import { FormState } from "@/types/Form";

import { Button } from "@nextui-org/react";
import { FaCopy, FaRegCopy, FaSave } from "react-icons/fa";

import { levels } from "@/data/formdata";
import { getTimeDifference } from "@/utils/dateHelpers";
import { saveMessage } from "@/actions/messages";

import { useDateFormatter } from "@/hooks/useDateFormatter";
import ConfirmModal from "../UI/ConfirmModal";

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

  const levelColor = levels.find((l) => l.text === level)?.color;

  let formatter = useDateFormatter();
  const convertData = (data: Date) => formatter.format(data);

  const timeDifference = endDate && getTimeDifference(startDate, endDate);

  useEffect(() => {
    setCopied(false);
  }, [formState]);

  const onCopyText = async () => {
    if (node.current) {
      setCopied(false);
      const content = node.current.innerText;
      await navigator.clipboard.writeText(content);
      setCopied(true);
    }
  };

  const onSave = async () => {
    const newMessage = {
      ...formState,
      startDate: convertData(startDate),
      endDate: endDate && convertData(endDate),
    };
    const messages = await saveMessage(newMessage);
    // setMessages(messages);
  };

  return (
    <div>
      <div ref={node} style={{ whiteSpace: "pre-wrap" }}>
        <div>
          Рівень впливу:
          <span className={`text-${levelColor} capitalize`}> {level}</span>{" "}
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
        <Button
          onClick={onCopyText}
          variant="ghost"
          isIconOnly
          className="mt-4"
        >
          {isCopied ? <FaCopy color="#c8ebad" /> : <FaRegCopy />}
        </Button>
        <ConfirmModal
          triggerIcon={<FaSave />}
          className="mt-4 items-center"
          headerText="Зберегти повідомлення?"
          onSave={onSave}
          type="submit"
          variant="ghost"
        />
      </div>
    </div>
  );
};

export default Message;

import React from "react";
import Link from "next/link";
import { Button, Card, CardBody, Tooltip } from "@nextui-org/react";
import { Message } from "@prisma/client";

import { levels } from "@/data/formdata";
import { useDateFormatter } from "@/hooks/useDateFormatter";

import { TemplateIcon, ViewIcon } from "@/components/icons/Icons";

import { FormState } from "@/types/Form";

interface MessageCardProps {
  message: Message;
  onTemplatePress: (message: FormState) => void;
}
const MessageCard = ({ message, onTemplatePress }: MessageCardProps) => {
  const {
    id,
    level,
    theme,
    reasons,
    activities,
    startDate,
    endDate,
    isResolved,
    numberOfMessage,
    numberOfIncident,
  } = message;
  const levelColor = levels.find((l) => l.text === level)?.color;
  let formatter = useDateFormatter();
  const convertData = (data: Date) => formatter.format(data);

  return (
    <Card>
      <CardBody>
        <div>
          <div className="flex mb-3 gap-2 w-full justify-end relative">
            <Tooltip showArrow content="Шаблон">
              <Button
                className="min-w-0"
                size="sm"
                variant="bordered"
                color="primary"
                onPress={() => onTemplatePress(message)}
              >
                <TemplateIcon />
              </Button>
            </Tooltip>

            <Tooltip showArrow content="Переглянути">
              <Button
                color="success"
                className="min-w-0"
                variant="bordered"
                size="sm"
              >
                <Link href={`/incidents/${id}`}>
                  <ViewIcon />
                </Link>
              </Button>
            </Tooltip>
          </div>
          Рівень впливу:
          <span className={`text-${levelColor} capitalize`}> {level}</span>{" "}
        </div>
        <div>Шановні Колеги!</div>
        <div>{theme}</div>
        {reasons && <div>Причини: {reasons}</div>}
        {activities && <div>Вжиті заходи: {activities}</div>}
        <div>
          Час початку:{" "}
          <span className="text-success-700"> {convertData(startDate)}</span>
        </div>

        <div>
          {isResolved ? "Час завершення:" : "Очікуванний час завершення:"}{" "}
          <span className="text-success-700">
            {endDate ? convertData(endDate) : "уточнюється"}
          </span>
        </div>

        <div>Повідомлення №: {numberOfMessage}</div>
        <div className="text-success-700">{numberOfIncident}</div>
      </CardBody>
    </Card>
  );
};

export default MessageCard;

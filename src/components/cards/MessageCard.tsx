import { levels } from "@/data/formdata";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { FormState } from "@/types/Form";
import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";

interface MessageCardProps {
  message: FormState;
  updateFormState: (message: FormState) => void;
  onTemplatePress: (message: FormState) => void;
}
const MessageCard = ({
  message,
  updateFormState,
  onTemplatePress,
}: MessageCardProps) => {
  const {
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
          <div className="flex mb-3 gap-2 w-full justify-center">
            <Button variant="ghost" onPress={() => onTemplatePress(message)}>
              Шаблон
            </Button>
            <Button variant="ghost" onPress={() => updateFormState(message)}>
              Перегляд
            </Button>
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

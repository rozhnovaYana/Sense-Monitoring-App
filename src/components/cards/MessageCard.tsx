import { FormStateDB } from "@/types/Form";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";
interface MessageCardProps {
  message: FormStateDB;
  onPress: (message: FormStateDB) => void;
}
const MessageCard = ({ message, onPress }: MessageCardProps) => {
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
  return (
    <Card onPress={() => onPress(message)} isPressable>
      <CardBody>
        <div>
          Рівень впливу:
          <span className={`capitalize`}> {level}</span>{" "}
        </div>
        <div>Шановні Колеги!</div>
        <div>{theme}</div>
        {reasons && <div>Причини: {reasons}</div>}
        {activities && <div>Вжиті заходи: {activities}</div>}
        <div>
          Час початку: <span className="text-success-100">{startDate}</span>
        </div>

        <div>
          {isResolved ? "Час завершення:" : "Очікуванний час завершення:"}{" "}
          <span className="text-success-100">
            {endDate ? endDate : "уточнюється"}
          </span>
        </div>
        {/* {isResolved && timeDifference && (
          <div>Тривалість: {timeDifference}</div>
        )} */}

        <div>Повідомлення №: {numberOfMessage}</div>
        <div>{numberOfIncident}</div>
      </CardBody>
    </Card>
  );
};

export default MessageCard;

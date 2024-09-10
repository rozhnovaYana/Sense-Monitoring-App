import React, { useRef } from "react";
import { FormState } from "@/types/Form";

import { toast } from "react-toastify";

import { levels } from "@/data/formdata";
import { getTimeDifference } from "@/utils/dateHelpers";
import { saveMessage } from "@/actions/messages";

import { useDateFormatter } from "@/hooks/useDateFormatter";
import ConfirmModal from "@/components/UI/ConfirmModal";
import { EditIcon, SaveIcon } from "@/components/icons/Icons";
import SocialBlocks from "@/components/social/SocialBlocks";

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
  const isActiveIncident = formState?.id;
  const node = useRef<HTMLDivElement>(null);

  let formatter = useDateFormatter();
  const convertData = (data: Date) => formatter.format(data);

  const timeDifference = endDate && getTimeDifference(startDate, endDate);

  const onSave = async () => {
    const data = await saveMessage(formState);
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
          triggerIcon={isActiveIncident ? <EditIcon /> : <SaveIcon />}
          className="min-w-0 mt-4 items-center"
          headerText="Зберегти повідомлення?"
          onSave={onSave}
          type="submit"
          variant="ghost"
          title={isActiveIncident ? "Змінити" : "Зберегти"}
        />
      </div>
      {isActiveIncident && (
        <SocialBlocks node={node?.current} formState={formState} />
      )}
    </>
  );
};

export default Message;

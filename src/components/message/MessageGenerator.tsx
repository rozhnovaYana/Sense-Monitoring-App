"use client";

import { useRef, useState } from "react";
import { Button, Divider } from "@nextui-org/react";

import IncidentForm from "@/components/incident/IncidentForm";
import Message from "@/components/message/Message";
import SearchMessage from "@/components/message/Search";
import MailingForm from "@/components/mailing/MailingForm";
import CardsGrid from "@/components/cards/CardsGrid";

import { FormDataInitialState } from "@/data/formdata";
import { type FormState } from "@/types/Form";
import { Message as MessageType } from "@prisma/client";

export default function MessagesGenerator({
  messages,
  message,
}: {
  messages?: MessageType[];
  message?: MessageType;
}) {
  const [formState, updateFormState] = useState<FormState | MessageType>(
    message || FormDataInitialState
  );

  const mailingFormref = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    updateFormState(FormDataInitialState);
    mailingFormref?.current?.reset();
  };

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex flex-col relative">
        <Button
          size="sm"
          variant="bordered"
          className="z-10 ml-auto text-red-300 absolute right-0"
          onClick={resetForm}
        >
          Очистити
        </Button>
        <IncidentForm formState={formState} updateFormState={updateFormState} />
        <Divider className="mt-10" />
        {formState.numberOfMessage === "1" &&
          formState.level != "information" && (
            <MailingForm
              ref={mailingFormref}
              numberOfIncident={formState.numberOfIncident}
              startDate={formState.startDate}
            />
          )}
      </div>
      <div>
        <Message formState={formState} updateFormState={updateFormState} />
        {!message && (
          <>
            <SearchMessage />
            <CardsGrid messages={messages} updateFormState={updateFormState} />
          </>
        )}
      </div>
    </div>
  );
}

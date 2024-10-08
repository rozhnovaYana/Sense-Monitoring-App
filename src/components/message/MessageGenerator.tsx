"use client";
import { Button, Divider } from "@nextui-org/react";

import Form from "@/components/form/Form";
import Message from "@/components/message/Message";
import SearchMessage from "@/components/message/Search";
import MailingForm from "@/components/mailing/MailingForm";

import { FormDataInitialState } from "@/data/formdata";
import { FormStateDB, type FormState } from "@/types/Form";
import { ReactNode, useRef, useState } from "react";

export default function MessagesGenerator({
  children,
}: {
  children: ReactNode;
}) {
  const [formState, updateFormState] =
    useState<FormState>(FormDataInitialState);

  const mailingFormref = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    updateFormState(FormDataInitialState);
    mailingFormref?.current?.reset();
  };

  return (
    <div className="grid grid-cols-2 mt-10 gap-10">
      <div className="flex flex-col relative">
        <Button
          size="sm"
          variant="bordered"
          className="z-10 ml-auto text-red-300 absolute right-0"
          onClick={resetForm}
        >
          Очистити
        </Button>
        <Form formState={formState} updateFormState={updateFormState} />
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
        <Message formState={formState} />
        <SearchMessage />
        {children}
      </div>
    </div>
  );
}

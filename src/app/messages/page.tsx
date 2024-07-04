"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Divider } from "@nextui-org/react";

import Form from "@/components/form/Form";
import Message from "@/components/message/Message";
import CardsGrid from "@/components/cards/CardsGrid";
import SearchMessage from "@/components/search/Search";
import MailingForm from "@/components/mailing/MailingForm";
import CardSkeleton from "@/components/cards/CardSkeleton";

import { getMessages } from "@/actions/messages";
import { FormDataInitialState } from "@/data/formdata";
import { FormStateDB, type FormState } from "@/types/Form";

export default function Messages() {
  const [formState, updateFormState] =
    useState<FormState>(FormDataInitialState);
  const mailingFormref = useRef<HTMLFormElement>(null);

  const [messages, setMessages] = useState<FormStateDB[]>([]);
  const [query, setQuery] = useState("");
  const [{ isLoading, isError }, setFetchState] = useState({
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (err) {
        setFetchState((state) => ({ ...state, isError: true }));
      } finally {
        setFetchState((state) => ({ ...state, isLoading: false }));
      }
    })();
  }, []);

  const resetForm = () => {
    updateFormState(FormDataInitialState);
    mailingFormref?.current?.reset();
  };
  console.log(isError)

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
        <Message formState={formState} setMessages={setMessages} />
        <SearchMessage onValueChange={setQuery} value={query} />
        {isError ? (
          <div className="text-center">Щось пішло не так...</div>
        ) : isLoading ? (
          <div className="grid gap-5 grid-cols-2 mt-10 max-h-30per">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <CardsGrid
            query={query}
            messages={messages}
            updateFormState={updateFormState}
          />
        )}
      </div>
    </div>
  );
}

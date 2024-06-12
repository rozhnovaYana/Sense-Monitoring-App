"use client";

import { useEffect, useState } from "react";

import Form from "@/components/form/Form";
import Message from "@/components/message/Message";

import { FormStateDB, type FormState } from "@/types/Form";

import { FormDataInitialState } from "@/data/formdata";
import CardsGrid from "@/components/cards/CardsGrid";
import { getMessages } from "@/actions/messages";
import SearchMessage from "@/components/search/Search";
import { Button, Divider, Input, TimeInput } from "@nextui-org/react";
import MailingForm from "@/components/mailing/MailingForm";

export default function Home() {
  const [formState, updateFormState] =
    useState<FormState>(FormDataInitialState);

  const [messages, setMessages] = useState<FormStateDB[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getMessages();
      setMessages(data);
    })();
  }, []);

  return (
    <div className="grid grid-cols-2 mt-16 gap-10">
      <div>
        <Form formState={formState} updateFormState={updateFormState} />
        <Divider className="mt-10" />
        {formState.numberOfMessage === "1" &&
          formState.level != "information" && (
            <MailingForm numberOfIncident={formState.numberOfIncident} />
          )}
      </div>
      <div>
        <Message formState={formState} setMessages={setMessages} />
        <SearchMessage onValueChange={setQuery} value={query} />
        <CardsGrid
          query={query}
          messages={messages}
          updateFormState={updateFormState}
        />
      </div>
    </div>
  );
}

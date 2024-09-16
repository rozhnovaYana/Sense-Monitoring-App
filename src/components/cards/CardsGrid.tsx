"use client";
import React, { Dispatch, SetStateAction } from "react";
import MessageCard from "@/components/cards/MessageCard";
import { FormState } from "@/types/Form";
import { ScrollShadow } from "@nextui-org/react";
import { FormDataInitialState } from "@/data/formdata";

const CardsGrid = ({
  messages,
  updateFormState,
}: {
  messages?: FormState[];
  updateFormState: Dispatch<SetStateAction<FormState>>;
}) => {
  if (!messages) return null;
  const onTemplatePress = (message: FormState) => {
    const updatedMessage: FormState = {
      ...message,
      startDate: FormDataInitialState.startDate,
      endDate: null,
      numberOfIncident: FormDataInitialState.numberOfIncident,
      numberOfMessage: FormDataInitialState.numberOfMessage,
      isResolved: false,
      id: undefined,
    };
    updateFormState(updatedMessage);
  };

  return (
    <ScrollShadow
      hideScrollBar
      className="grid gap-5 grid-cols-2 mt-10 max-h-30per"
    >
      {messages.map((message, index) => (
        <MessageCard
          key={index}
          message={message}
          onTemplatePress={onTemplatePress}
        />
      ))}
    </ScrollShadow>
  );
};

export default CardsGrid;

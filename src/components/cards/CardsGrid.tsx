"use client";
import React from "react";
import MessageCard from "@/components/cards/MessageCard";
import { FormStateDB } from "@/types/Form";
import { ScrollShadow } from "@nextui-org/react";

const CardsGrid = ({ messages }: { messages: FormStateDB[] }) => {
  const onCardPress = (message: FormStateDB) => {
    
    // const updatedMessage: FormState = {
    //   ...message,
    //   startDate: FormDataInitialState.startDate,
    //   endDate: undefined,
    //   numberOfIncident: FormDataInitialState.numberOfIncident,
    //   numberOfMessage: FormDataInitialState.numberOfMessage,
    //   isResolved: false,
    // };
    // updateFormState(updatedMessage);
  };

  return (
    <ScrollShadow
      hideScrollBar
      className="grid gap-5 grid-cols-2 mt-10 max-h-30per"
    >
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} onPress={onCardPress} />
      ))}
    </ScrollShadow>
  );
};

export default CardsGrid;

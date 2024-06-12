import React, { Dispatch, SetStateAction } from "react";
import MessageCard from "@/components/cards/MessageCard";
import { FormState, FormStateDB } from "@/types/Form";
import { ScrollShadow } from "@nextui-org/react";
import { FormDataInitialState } from "@/data/formdata";

const CardsGrid = ({
  messages,
  updateFormState,
  query,
}: {
  messages: FormStateDB[];
  updateFormState: Dispatch<SetStateAction<FormState>>;
  query: string;
}) => {
  const onCardPress = (message: FormStateDB) => {
    const updatedMessage: FormState = {
      ...message,
      startDate: FormDataInitialState.startDate,
      endDate: undefined,
      numberOfIncident: FormDataInitialState.numberOfIncident,
      numberOfMessage: FormDataInitialState.numberOfMessage,
      isResolved: false,
    };
    updateFormState(updatedMessage);
  };
  const filteredMessages = messages.filter(
    ({ theme, numberOfIncident, reasons }) => {
      const regex = new RegExp(query, "i");
      return (
        regex.test(theme) || regex.test(numberOfIncident) || regex.test(reasons)
      );
    }
  );
  return (
    <ScrollShadow
      hideScrollBar
      className="grid gap-5 grid-cols-2 mt-10 max-h-30per"
    >
      {filteredMessages.map((message, index) => (
        <MessageCard key={index} message={message} onPress={onCardPress} />
      ))}
    </ScrollShadow>
  );
};

export default CardsGrid;

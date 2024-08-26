import { Suspense } from "react";

import CardsGrid from "@/components/cards/CardsGrid";
import CardSkeleton from "@/components/cards/CardSkeleton";
import MessagesGenerator from "@/components/message/MessageGenerator";

import { getMessagesByTerm } from "@/db/queries/messages";

export default async function Messages({
  searchParams: { term },
}: {
  searchParams: { term: string };
}) {
  const messages = await getMessagesByTerm(term);
  return <MessagesGenerator messages={messages} />;
}

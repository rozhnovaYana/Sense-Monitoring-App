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
  return (
    <MessagesGenerator>
      <Suspense
        fallback={
          <div className="grid gap-5 grid-cols-2 mt-10 max-h-30per">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        }
      >
        <CardsGrid messages={messages} />
      </Suspense>
    </MessagesGenerator>
  );
}

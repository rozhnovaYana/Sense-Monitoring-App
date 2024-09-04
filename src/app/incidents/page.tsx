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

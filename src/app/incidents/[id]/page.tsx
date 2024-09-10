import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import MessagesGenerator from "@/components/message/MessageGenerator";
import ButtonUI from "@/components/UI/Button";

import { getMessagesById } from "@/db/queries/messages";
import { BackArrowIcon } from "@/components/icons/Icons";

type IncidentPageProps = {
  params: { id: string };
};

const IncidentPage = async ({ params }: IncidentPageProps) => {
  const message = +params?.id && (await getMessagesById(+params?.id));

  if (!message) notFound();
  return (
    <div className="relative">
      <ButtonUI variant="flat" size="sm" className="absolute -top-10">
        <Link href="/incidents" className="text-small flex items-center gap-2">
          <BackArrowIcon /> Назад
        </Link>
      </ButtonUI>
      <MessagesGenerator message={message} />
    </div>
  );
};

export default IncidentPage;

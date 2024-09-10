import { db } from "@/db";

export const getMessagesById = (id: number) => {
  return db.message.findFirst({
    where: {
      id,
    },
  });
};

export const getMessagesByTerm = (term?: string) => {
  if (!term || term === "") {
    return db.message.findMany({
      orderBy: {
        id: "desc",
      },
    });
  }
  const decodedTerm = decodeURI(term);
  return db.message.findMany({
    where: {
      OR: [
        { theme: { contains: decodedTerm, mode: "insensitive" } },
        { numberOfIncident: { contains: decodedTerm, mode: "insensitive" } },
        { reasons: { contains: decodedTerm, mode: "insensitive" } },
      ],
    },
    orderBy: {
      id: "desc",
    },
  });
};

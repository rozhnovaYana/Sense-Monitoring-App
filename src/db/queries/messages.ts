import { db } from "@/db";

export const getMessagesByTerm = (term?: string) => {
  if (!term || term === "") {
    return db.message.findMany({
      orderBy: {
        id: "desc",
      },
    });
  }
  return db.message.findMany({
    where: {
      OR: [
        { theme: { contains: term } },
        { numberOfIncident: { contains: term } },
        { reasons: { contains: term } },
      ],
    },
    orderBy: {
      id: "desc",
    },
  });
};

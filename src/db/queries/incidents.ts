"use server";
import { db } from "@/db/index";

export const getIncidents = async () => {
  return await db.incident.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      user: true,
    },
  });
};

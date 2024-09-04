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
export const getIncidentByNumber = async (numberOfIncident: string) => {
  return await db.incident.findUnique({
    where: { numberOfIncident },
  });
};

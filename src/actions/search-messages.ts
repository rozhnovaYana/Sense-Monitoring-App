"use server";

import { redirect } from "next/navigation";

export const searchMessage = (term: string) => {
  if (!term || typeof term !== "string") {
    redirect("/messages");
  }
  redirect(`/messages?term=${term}`);
};

"use server";

import { redirect } from "next/navigation";

export const searchMessage = (term: string) => {
  if (!term || typeof term !== "string") {
    redirect("/incidents");
  }
  const encodedUrl = encodeURI(term);
  redirect(`/incidents?term=${encodedUrl}`);
};

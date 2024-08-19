import { getUserFromDB } from "@/db/queries/users";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { login } = await request.json();
  const user = await getUserFromDB(login);

  const resp = user ? { user } : { error: "The user is not found" };
  return new Response(JSON.stringify(resp));
};

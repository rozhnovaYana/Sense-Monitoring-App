import { getUserFromDB } from "@/db/queries/users";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name } = await request.json();
  console.log(name);
  const user = await getUserFromDB(name);

  const resp = user ? { user } : { error: "The user is not found" };
  return new Response(JSON.stringify(resp));
};

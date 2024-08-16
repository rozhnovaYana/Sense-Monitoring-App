import { db } from "..";

export const getUserFromDB = async (name: string) => {
  const user = await db.user.findFirst({
    where: {
      name,
    },
  });
  return user;
};

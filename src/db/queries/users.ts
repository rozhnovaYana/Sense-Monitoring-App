import { db } from "..";

export const getUserFromDB = async (login: string) => {
  const user = await db.user.findFirst({
    where: {
      login,
    },
  });
  return user;
};

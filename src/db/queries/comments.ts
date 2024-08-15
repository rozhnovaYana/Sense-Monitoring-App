import { db } from "@/db";

export const getCommentsById = (postId: string) => {
  return db.comment.findMany({
    where: {
      postId,
    },
  });
};

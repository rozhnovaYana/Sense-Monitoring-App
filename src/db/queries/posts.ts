import { db } from "@/db";

export const getPostById = (postId: string) => {
  return db.post.findFirst({
    where: {
      id: postId,
    },
  });
};

import { db } from "@/db";

export const getPostById = (postId: string) =>
  db.post.findFirst({
    where: {
      id: postId,
    },
  });

export const getAllPosts = async () =>
  await db.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

import { User } from "@/types/User";

export type Comment = {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

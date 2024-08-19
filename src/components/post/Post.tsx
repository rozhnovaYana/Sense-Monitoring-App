import React from "react";

import { Card } from "@nextui-org/react";
import CommentCreateForm from "@/components/comment/CommentCreateForm";

import { auth } from "@/auth";
import CommentList from "@/components/comment/CommentList";
import DiscussCard from "@/components/UI/DiscussCard";

import { createPost, deletePost } from "@/actions/posts";
import { User } from "@/types/User";

type PostProps = {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

const Post = async ({ content, updatedAt, userId, id, user }: PostProps) => {
  const session = await auth();
  const activeUser = session?.user?.id;

  return (
    <Card className="py-3 px-5 w-full">
      <DiscussCard
        postCreatedByActiveUser={activeUser === userId}
        content={content}
        updatedAt={updatedAt}
        userName={user.name}
        id={id}
        formAction={createPost}
        onDeleteItem={deletePost}
      />
      <CommentList id={id} user={user} />
      <CommentCreateForm id={id} />
    </Card>
  );
};

export default Post;

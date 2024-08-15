import React from "react";
import { Comment } from "@prisma/client";

import DiscussCard from "@/components/UI/DiscussCard";

import { createComment, deleteComment } from "@/actions/comment";
import { auth } from "@/auth";

type CommentProps = {
  comment: Comment;
  comments: Comment[];
  user: string;
};

const CommentUI = async ({ comment, comments, user }: CommentProps) => {
  const session = await auth();
  const activeUser = session?.user?.name;

  return (
    <DiscussCard
      postCreatedByActiveUser={activeUser === user}
      content={comment.content}
      updatedAt={comment.updatedAt}
      user={user}
      id={comment.id}
      formAction={createComment}
      onDeleteItem={deleteComment}
      className="ml-4"
      postId={comment.postId}
    />
  );
};

export default CommentUI;

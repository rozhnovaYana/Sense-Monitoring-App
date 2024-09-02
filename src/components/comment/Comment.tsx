import React from "react";
import DiscussCard from "@/components/UI/DiscussCard";

import { createComment, deleteComment } from "@/actions/comment";
import { auth } from "@/auth";

import { User } from "@/types/User";
import { Comment } from "@/types/Comment";

type CommentProps = {
  comment: Comment;
  comments: Comment[];
  user: User;
};

const CommentUI = async ({ comment, comments, user }: CommentProps) => {
  const session = await auth();
  const activeUser = session?.user?.id;

  return (
    <DiscussCard
      postCreatedByActiveUser={activeUser === comment.userId}
      content={comment.content}
      updatedAt={comment.updatedAt}
      userName={comment.user.name}
      id={comment.id}
      formAction={createComment}
      onDeleteItem={deleteComment}
      className="ml-4"
      postId={comment.postId}
    />
  );
};

export default CommentUI;

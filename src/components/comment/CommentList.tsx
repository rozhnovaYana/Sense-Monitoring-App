import React from "react";

import Comment from "@/components/comment/Comment";

import { getCommentsById } from "@/db/queries/comments";

type CommentListProps = {
  id: string;
  user: string;
};

const CommentList = async ({ id, user }: CommentListProps) => {
  const comments = await getCommentsById(id);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  return (
    <div className="gap-4 flex flex-col mt-4">
      {topLevelComments.map((comment) => (
        <Comment
          user={user}
          key={comment.id}
          comment={comment}
          comments={comments}
        />
      ))}
    </div>
  );
};

export default CommentList;

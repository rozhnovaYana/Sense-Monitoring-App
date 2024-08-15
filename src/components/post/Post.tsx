import React from "react";

import { Card } from "@nextui-org/react";
import CommentCreateForm from "@/components/comment/CommentCreateForm";

import { auth } from "@/auth";
import CommentList from "@/components/comment/CommentList";
import DiscussCard from "@/components/UI/DiscussCard";

import { createPost, deletePost } from "@/actions/posts";

type PostProps = {
  id: string;
  content: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
};

const Post = async ({ content, updatedAt, user, id }: PostProps) => {
  const session = await auth();
  const activeUser = session?.user?.name;

  return (
    <Card className="py-3 px-5 w-full">
      <DiscussCard
        postCreatedByActiveUser={activeUser === user}
        content={content}
        updatedAt={updatedAt}
        user={user}
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

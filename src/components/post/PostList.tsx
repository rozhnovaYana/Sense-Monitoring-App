import React from "react";

import Post from "@/components/post/Post";

import { getAllPosts } from "@/db/queries/posts";

const PostList = async () => {
  const posts = await getAllPosts();

  return (
    <div className="grid gap-5 grid-cols-1  max-h-30per">
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default PostList;

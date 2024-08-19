import React from "react";

import Post from "@/components/post/Post";
import { db } from "@/db";

const PostList = async () => {
  const posts = await db.post.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div className="grid gap-5 grid-cols-1 mt-5 max-h-30per">
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default PostList;

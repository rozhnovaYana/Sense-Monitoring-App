import React from "react";

import CreatePostForm from "@/components/post/CreatePostForm";
import PostList from "@/components/post/PostList";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <CreatePostForm />
      <PostList />
    </div>
  );
};

export default MainPage;

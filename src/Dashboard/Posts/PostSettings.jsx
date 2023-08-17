import React from "react";
import axios from "axios";
import Link from "next/link";

const PostSettings = ({ postid }) => {
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete("/api/posts", {
        data: { id: postId },
      });
      console.log("Post deleted:", response.data);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="post_toolbar">
      <Link href={`/dashboard/post/${postid}/edit`}>Edit</Link>
      <button onClick={() => deletePost(postid)}>Delete</button>
    </div>
  );
};

export default PostSettings;
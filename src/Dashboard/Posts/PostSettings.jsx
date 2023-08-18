import React from "react";
import axios from "axios";
import Link from "next/link";

const PostSettings = ({ postid, onDelete }) => {
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete("/api/posts", {
        data: { id: postId },
      });
      console.log("Post deleted:", response.data);
      onDelete();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="post_toolbar">
      <Link href={`/dashboard/post/${postid}/edit`}>Edit</Link>
      <Link href="" onClick={() => deletePost(postid)}>Delete</Link>
    </div>
  );
};

export default PostSettings;
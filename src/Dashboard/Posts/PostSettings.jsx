import React from "react";
import axios from "axios";

const PostSettings = ({ postid }) => {

    const deletePost = async (postId) => {

        try {
          const response = await axios.delete("/api/posts", { data: { id: postId } });
          console.log("Post deleted:", response.data);
        } catch (error) {
          console.error("Failed to delete post:", error);
        }
      };

    return (
        <div className="post_toolbar">
            <button>Edit</button>
            <button onClick={() => deletePost(postid)}>Delete</button>
        </div>
    );
}

export default PostSettings;
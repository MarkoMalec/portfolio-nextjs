import React from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const TableSettings = ({ postid, onDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { asPath } = router;

  const contentType = asPath.includes("posts")
    ? "post"
    : asPath.includes("projects")
    ? "project"
    : asPath.includes("experiences")
    ? "experience"
    : undefined;

  const deleteContent = async (postId) => {
    try {
      const response = await axios.delete(`/api/${contentType}s`, {
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
      <Link href={`/dashboard/${contentType}/${postid}/edit`}>Edit</Link>
      <Link href="#" onClick={() => deleteContent(postid)}>
        Delete
      </Link>
    </div>
  );
};

export default TableSettings;

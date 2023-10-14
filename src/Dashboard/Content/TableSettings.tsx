import React from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type ContentData = {
  contentType: string;
  postid: number;
  onDelete: Function;
}

const TableSettings = ({ contentType, postid, onDelete }: ContentData) => {
  const { data: session } = useSession();

  const deleteContent = async (postId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      if (session?.user.role !== "admin") {
        toast("You don't have enough priviledges to delete this post.");
      } else {
        try {
          const response = await axios.delete(`/api/${contentType}s`, {
            data: { id: postId },
          });
          console.log("Post deleted:", response.data);
          onDelete();
        } catch (error) {
          console.error("Failed to delete post:", error);
        }
      }
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

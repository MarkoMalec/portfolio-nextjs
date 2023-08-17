import React from "react";
import Link from "next/link";
import PostSettings from "./PostSettings";
import axios from "axios";

const PostTable = ({ posts }) => {
  // Convert ISO string dates to JavaScript Date objects
  const formattedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt).toDateString(),
    updatedAt: new Date(post.updatedAt).toDateString(),
  }));

  // If needed in the future, you can sort them like:
  // formattedPosts.sort((a, b) => b.createdAt - a.createdAt); // For sorting in descending order

  return (
    <div className="posts_list">
      <table id="posts_table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {formattedPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td className="post_name-column">
                <Link href={`/dashboard/post/${post.id}`}>{post.title}</Link>
                <PostSettings postid={post.id} />
              </td>
              <td>{post.createdAt}</td>
              <td>{post.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;

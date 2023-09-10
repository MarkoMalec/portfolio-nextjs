import React, { useState } from "react";
import Link from "next/link";
import PostSettings from "./PostSettings";
import { BiSort } from 'react-icons/bi';

const PostTable = ({ postsData }) => {
  const [posts, setPosts] = useState(postsData);
  const [sortConfig, setSortConfig] = useState({
    key: 'id', // default sort by id
    direction: 'descending'
  });

  // console.log(postsData);

  // Convert ISO string dates to JavaScript Date objects
  const formattedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt).toDateString(),
    updatedAt: new Date(post.updatedAt).toDateString(),
  }));

  const sortedPosts = [...formattedPosts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleDelete = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="posts_list">
      <table id="posts_table">
        <thead>
          <tr>
            {/* <th>
              <button onClick={() => requestSort('id')}>ID</button>
            </th> */}
            <th>
             <button className="btn" onClick={() => requestSort('title')}>Title <BiSort /></button>
            </th>
            <th>
              <button className="btn" onClick={() => requestSort('createdAt')}>Created At <BiSort /></button>
            </th>
            <th>
              <button className="btn" onClick={() => requestSort('updatedAt')}>Updated At <BiSort /></button>
            </th>
            <th>
              <button className="btn" onClick={() => requestSort('Author')}>Author <BiSort /></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post) => (
            <tr key={post.id}>
              {/* <td>{post.id}</td> */}
              <td className="post_name-column">
                <Link href={`/dashboard/post/${post.id}/edit`}>
                  {post.title}
                </Link>
                <PostSettings
                  postid={post.id}
                  onDelete={() => handleDelete(post.id)}
                />
              </td>
              <td>{post.createdAt}</td>
              <td>{post.updatedAt}</td>
              <td>{post.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default PostTable;

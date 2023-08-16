import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSession, getSession, signOut } from "next-auth/react";
import DashboardLayout from "@Dashboard/layout";

const NewPost = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
        content,
        session,
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/posts",
        payload,
        { withCredentials: true }
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          console.error("User is not authenticated");
          return;
        }
        console.error("Failed to create post:", err.message);
      }
    },
    onSuccess: (data) => {
      console.log("Post created:", data);
      setTitle("");
      setContent("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };
  return (
    <DashboardLayout>
      <form className="create-article" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Publish
        </button>
      </form>
    </DashboardLayout>
  );
};

export default NewPost;

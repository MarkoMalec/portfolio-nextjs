import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const usePostActions = () => {
  const router = useRouter();

  const createPostMutation = useMutation(
    async (data) => {
      const { title, content, session, featuredPhoto, excerpt } = data;
      const { data: responseData } = await axios.post(
        "/api/posts",
        {
          title,
          content,
          session,
          featuredPhoto,
          excerpt
        },
        { withCredentials: true }
      );
      return responseData;
    },
    {
      onError: (err) => {
        if (err.response?.status === 401) {
          console.error("User is not authenticated");
          return;
        }
        console.error("Failed to create post:", err.message);
      },
      onSuccess: (data) => {
        console.log("Post created:", data);
        const newPathname = `/dashboard/post/${data.id}/edit`;
        sessionStorage.setItem("toastMessage", "Post Published!");
        router.push(newPathname);
      },
    }
  );

  const editPostMutation = useMutation(
    async (data) => {
      const { id, title, content, featuredPhoto, session, excerpt } = data;
      const { data: responseData } = await axios.patch(
        "/api/posts",
        {
          id,
          title,
          content,
          featuredPhoto,
          session,
          excerpt
        },
        { withCredentials: true }
      );
      return responseData;
    },
    {
      onError: (err) => {
        if (err.response?.status === 401) {
          console.error("User is not authenticated");
          return;
        }
        console.error("Failed to edit post:", err.message);
      },
      onSuccess: (data) => {
        console.log("Post edited:", data);
        toast("Post edited successfully! :)");
      },
    }
  );

  return {
    createPost: createPostMutation.mutate,
    editPost: editPostMutation.mutate,
    isLoading: createPostMutation.isLoading || editPostMutation.isLoading,
  };
};

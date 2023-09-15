import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useProjectActions = () => {
  const router = useRouter();

  const createProjectMutation = useMutation(
    async (data) => {
      const { title, content, session, featuredPhoto, excerpt } = data;
      const { data: responseData } = await axios.post(
        "/api/projects",
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
        console.error("Failed to create project:", err.message);
      },
      onSuccess: (data) => {
        console.log("Post created:", data);
        const newPathname = `/dashboard/project/${data.id}/edit`;
        sessionStorage.setItem("toastMessage", "Post Published!");
        router.push(newPathname);
      },
    }
  );

  const editProjectMutation = useMutation(
    async (data) => {
      const { id, title, content, featuredPhoto, session, excerpt } = data;
      const { data: responseData } = await axios.patch(
        "/api/projects",
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
      onError: (err, data) => {
        console.table(data);
        if (err.response?.status === 401) {
          console.error("User is not authenticated");
          return;
        }
        toast("Ooops, something went wrong, try again later :/");
        console.error("Failed to edit the project:", err.message);
      },
      onSuccess: (data) => {
        console.log("Project edited:", data);
        toast("Project edited successfully! :)");
      },
    }
  );

  return {
    createProject: createProjectMutation.mutate,
    editProject: editProjectMutation.mutate,
    isLoading: createProjectMutation.isLoading || editProjectMutation.isLoading,
  };
};

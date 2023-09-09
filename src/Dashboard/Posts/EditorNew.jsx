import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
// import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSession } from "next-auth/react";

function EditorNew({ editPostData, featuredPhoto }) {
    const {data: session} = useSession();
  const { register, handleSubmit } = useForm();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (data) => {
      const { title, content, session } = data;

      const { data: responseData } = await axios.post(
        "/api/posts",
        {
          title,
          content,
          session,
          featuredPhoto,
        },
        { withCredentials: true }
      );
      return responseData;
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
      const newPathname = `/dashboard/post/${data.id}/edit`;
      sessionStorage.setItem("toastMessage", "Post Published!");
      router.push(newPathname);
    },
  });

  const { mutate: editPost, isLoading: isEditing } = useMutation({
    mutationFn: async (data) => {
      const { title, content, session } = data;

      const { data: responseData } = await axios.patch(
        "/api/posts",
        {
          title,
          content,
          session,
          id: editPostData.id,
          featuredPhoto,
        },
        { withCredentials: true }
      );
      return responseData;
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
      console.log("Post edited:", data);
      toast("Post edited successfully! :)");
    },
  });

  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    { ssr: false }
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmit = async (data) => {
    // Convert the editorState to raw JS object
    const rawContentState = convertToRaw(editorState.getCurrentContent());
  
    const payload = {
      title: data.title,
      content: JSON.stringify(rawContentState),
      session: session,
    };
  
    // Validation
    const missingContent = !editorState.getCurrentContent().hasText();
    const missingTitle = payload.title === "";
  
    if (missingContent || missingTitle) {
      missingContent && !missingTitle && alert("Content is empty :(");
      missingTitle &&
        !missingContent &&
        alert("You can't just leave the title empty :(");
      missingContent && missingTitle && alert("Bro are you kidding me? xD");
    } else {
      if (editPostData) {
        if (session.user.role === "admin") {
          editPost(payload);
        } else if (editPostData.authorId !== session.user.id) {
          console.log("you are NOT author");
          toast("You are not the author of this post. :(");
        } else {
          toast("You don't have privileges to edit this post!");
        }
      } else {
        createPost(payload);
      }
    }
  };
  

  return (
    <>
      <ToastContainer />
      <form id="article_form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: false },
            },
          }}
        />
        <button type="submit">Publish</button>
      </form>
    </>
  );

  // Function to handle image uploads.
  // You might have to rewrite this based on how you handle uploads in your application.
  function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload/image');
        const formData = new FormData();
        formData.append('image', file);
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        xhr.send(formData);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
}

export default EditorNew;

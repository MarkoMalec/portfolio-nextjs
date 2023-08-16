"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
// import { uploadFiles } from "@uploadthing/react";
import { uploadFiles } from "@api/uploadthing";

function Editor() {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //   const { mutate: createPost, isLoading } = useMutation({
  //     mutationFn: async () => {
  //       const payload = {
  //         title,
  //         content,
  //         session,
  //       };

  //       const { data } = await axios.post(
  //         "http://localhost:3000/api/posts",
  //         payload,
  //         { withCredentials: true }
  //       );
  //       return data;
  //     },
  //     onError: (err) => {
  //       if (err instanceof AxiosError) {
  //         if (err.response?.status === 401) {
  //           console.error("User is not authenticated");
  //           return;
  //         }
  //         console.error("Failed to create post:", err.message);
  //       }
  //     },
  //     onSuccess: (data) => {
  //       console.log("Post created:", data);
  //       setTitle("");
  //       setContent("");
  //     },
  //   });

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     createPost();
  //   };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: title,
      content: content,
      //   formState: { errors },
    },
  });

  const ref = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file) {
                  const [res] = await uploadFiles({
                    endpoint: "imageUploader",
                    files: [file],
                  });
                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {});
    };

    if (isMounted) {
      init();

      return () => {};
    }
  }, [isMounted, initializeEditor]);

  return (
    <div className="create-article">
      <form onSubmit={handleSubmit}>
        <TextareaAutosize spellCheck="false" placeholder="Title" />
        <div id="editor" />
      </form>
    </div>
  );
}

export default Editor;

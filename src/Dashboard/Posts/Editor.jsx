"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { uploadFiles } from "@lib/uploadthing";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Editor({ editPostData }) {
  const { data: session } = useSession();
  const router = useRouter();
  // const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [contentChanged, setContentChanged] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      content: null,
      session,
      // formState: { errors },
    },
  });
  const ref = useRef();
  const _titleRef = useRef(null);

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (data) => {
      const { title, content, session } = data;

      const { data: responseData } = await axios.post(
        "/api/posts",
        {
          title,
          content,
          session,
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
      // toast("Post Published!");
      const newPathname = `/dashboard/post/${data.id}/edit`;

      router.push(newPathname);
      // router.refresh();

      console.log("Post created:", data);
      return toast("Post Published!");
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
    },
  });

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

    if (editPostData) {
      setEditPostTitle(editPostData.title);
    }

    if (!ref.current) {
      const existingContent = editPostData
        ? JSON.parse(editPostData.content)
        : { blocks: [] };

      const editor = new EditorJS({
        holder: "editor",
        onReady: () => {
          ref.current = editor;
        },
        onChange: () => {
          setContentChanged(true);
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: existingContent,
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
                    files: [file],
                    endpoint: "imageUploader",
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
    console.log(editPostData, "editPostData in Editor.jsx");

    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, [editPostTitle]);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const onSubmit = async (data) => {
    const blocks = await ref.current?.save();
    const payload = {
      title: data.title,
      content: blocks,
      session: session,
    };

    // Validation
    const missingContent = payload.content.blocks.length === 0;
    const missingTitle = payload.title === "";
    if (missingContent || missingTitle) {
      missingContent && !missingTitle && alert("Content is empty :(");
      missingTitle &&
        !missingContent &&
        alert("You can't just leave the title empty :(");
      missingContent && missingTitle && alert("Bro are you kidding me? xD");
    } else {
      if (editPostData) {
        editPost(payload);
      } else {
        createPost(payload);
      }
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="create-article">
        <ToastContainer />
        <form id="article_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="editor_post-title--wrapper">
            <TextareaAutosize
              className="editor_post-title"
              ref={(e) => {
                _titleRef(e);
              }}
              {...register("title")}
              spellCheck="false"
              placeholder="Title"
              value={editPostTitle}
              onChange={(e) => setEditPostTitle(e.target.value)}
            />
          </div>
          <div id="editor" />
          <p className="editor_post--tip">
            Use <kbd>Tab</kbd> to open the command menu.
          </p>
        </form>
      </div>
      <button
        type="submit"
        form="article_form"
        className="btn btn-primary editor_post-button"
      >
        Publish
      </button>
    </>
  );
}

export default Editor;

'use client'

import React, { useCallback, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { uploadFiles } from "@lib/uploadthing";
import { useSession, getSession, signOut } from "next-auth/react";

function Editor({ postData }) {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
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
      console.log("Post created:", data);
      // setTitle("");
      // setContent("");
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const ImageTool = (await import('@editorjs/image')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
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
                  }
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
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

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
      session: session
    };
    createPost(payload);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="create-article">
      <form id="article_form" onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize
          ref={(e) => {
            _titleRef(e)
          }}
          {...register("title")}
          spellCheck="false"
          placeholder="Title"
        />
        <div id="editor" />
      </form>
    </div>
  );
}

export default Editor;

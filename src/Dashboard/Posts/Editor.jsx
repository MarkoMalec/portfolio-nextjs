"use client";

import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  forwardRef,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { uploadFiles } from "@lib/uploadthing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@uploadthing/react/styles.css";

const Editor = forwardRef(
  ({ editPostData, setTitle, onContentChange }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const [contentChanged, setContentChanged] = useState(false);
    const [editPostTitle, setEditPostTitle] = useState("");

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
        const existingContent = editPostData
          ? JSON.parse(editPostData.content)
          : { blocks: [] };

        const editor = new EditorJS({
          holder: "editor",
          onReady: () => {
            ref.current = editor;
          },
          onChange: async () => {
            setContentChanged(true);
            if (editPostData) {
              const newContent = await ref.current.save(); // Assuming ref.current.save() returns the new content
              onContentChange(JSON.stringify(newContent));
            }
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

    useEffect(() => {
      if (editPostData) {
        setEditPostTitle(editPostData.title);
      }
    }, [editPostData]);

    if (!isMounted) {
      return null;
    }

    return (
      <>
        <ToastContainer />
        <div id="editor" />
        <p className="editor_post--tip">
          Use <kbd>Tab</kbd> to open the command menu.
        </p>
      </>
    );
  }
);

export default Editor;

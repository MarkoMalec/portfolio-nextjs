import React, { useState, useRef } from "react";
import { usePostActions } from "../../hooks/posts/usePostActions";
import { handlePostSubmit } from "../../hooks/posts/postActions";
import { useSession } from "next-auth/react";
import PostTitle from "@Dashboard/Posts/PostTitle";
import Editor from "@Dashboard/Posts/Editor";
import PostExcerpt from "@Dashboard/Posts/Excerpt";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";

const NewPost = () => {
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  const [excerpt, setExcerpt] = useState("");
  const [editorData, setEditorData] = useState(null);
  const [title, setTitle] = useState("");

  const { data: session } = useSession();
  const { createPost, editPost, isLoading } = usePostActions();

  const editorRef = useRef();

  const handleSubmit = async () => {
    const data = {
      editorRef: editorRef,
      title: title,
      featuredPhoto: featuredPhoto,
      excerpt: excerpt,
    };
    await handlePostSubmit(
      data,
      session,
      null,
      featuredPhoto,
      excerpt,
      createPost,
      editPost
    );
  };

  return (
    <section className="post_creation-wrapper">
      <FeaturedPhoto setFeaturedPhoto={setFeaturedPhoto} />
      <div className="create-article">
        <div className="editor_post-title--wrapper">
          <PostTitle setTitle={setTitle} isEditMode={false} />
        </div>
        <Editor
          ref={editorRef}
          featuredPhoto={featuredPhoto}
          editorData={editorData}
        />
        <PostExcerpt setExcerpt={setExcerpt} />
      </div>
      <button disabled={isLoading} onClick={handleSubmit}>
        Submit Post
      </button>
    </section>
  );
};

export default NewPost;

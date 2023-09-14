import React, { useState, useRef } from "react";
import { useProjectActions } from "@hooks/projects/useProjectActions";
import { handleProjectSubmit } from "@hooks/projects/projectActions";
import { useSession } from "next-auth/react";
import PostEditorLayout from "@Dashboard/Posts/PostEditorLayout";
import PostTitle from "@Dashboard/Posts/PostTitle";
import Editor from "@Dashboard/Posts/Editor";
import PostExcerpt from "@Dashboard/Posts/Excerpt";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";
import Card from "@Dashboard/Card";

const NewProject = () => {
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  const [excerpt, setExcerpt] = useState("");
  const [editorData, setEditorData] = useState(null);
  const [title, setTitle] = useState("");

  const { data: session } = useSession();
  const { createProject, editProject, isLoading } = useProjectActions();

  const editorRef = useRef();

  const handleSubmit = async () => {
    const data = {
      editorRef: editorRef,
      title: title,
      featuredPhoto: featuredPhoto,
      excerpt: excerpt,
    };
    await handleProjectSubmit(
      data,
      session,
      null,
      featuredPhoto,
      excerpt,
      createProject,
      editProject
    );
  };

  return (
    <PostEditorLayout
      sidebarContent={
        <>
          <FeaturedPhoto setFeaturedPhoto={setFeaturedPhoto} />
          <PostExcerpt setExcerpt={setExcerpt} />
          <Card title="Post actions" className="post_editor--actions">
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Card>
        </>
      }
    >
      <div className="create-article">
        <div className="editor_post-title--wrapper">
          <PostTitle setTitle={setTitle} isEditMode={false} />
        </div>
        <Editor
          ref={editorRef}
          featuredPhoto={featuredPhoto}
          editorData={editorData}
        />
      </div>
    </PostEditorLayout>
  );
};

export default NewProject;

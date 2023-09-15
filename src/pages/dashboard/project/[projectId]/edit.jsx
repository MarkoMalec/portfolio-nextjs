import React, { useRef, useState } from "react";
import Link from "next/link";
import { fetchSingleProject } from "@utils/data-fetching";
import { useProjectActions } from "@hooks/projects/useProjectActions";
import { useSession } from "next-auth/react";
import PostEditorLayout from "@Dashboard/Posts/PostEditorLayout";
import PostTitle from "@Dashboard/Posts/PostTitle";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";
import PostExcerpt from "@Dashboard/Posts/Excerpt";
import Card from "@Dashboard/Card";

const EditProject = ({ project }) => {
  const [featuredPhoto, setFeaturedPhoto] = useState(project.featuredPhoto);
  const [updatedContent, setUpdatedContent] = useState(project.content); // Initialize with the original content
  const [initialTitle, setInitialTitle] = useState(project.title);
  const [newTitle, setTitle] = useState("");
  const [initialExcerpt, setInitialExcerpt] = useState(project.excerpt);
  const [newExcerpt, setExcerpt] = useState("");
  const { data: session } = useSession();
  const { editProject, isLoading } = useProjectActions();

  console.log(project.content)

  const editorRef = useRef(null);

  const handleSubmit = async () => {
    const data = {
      id: project.id,
      title: newTitle || initialTitle,
      content: updatedContent,
      featuredPhoto,
      session,
      excerpt: newExcerpt || initialExcerpt,
    };
    await editProject(data);
  };

  return (
    <PostEditorLayout
      sidebarContent={
        <>
          <FeaturedPhoto
            initialPhoto={project.featuredPhoto}
            setFeaturedPhoto={setFeaturedPhoto}
          />
          <PostExcerpt initialExcerpt={project.excerpt} setExcerpt={setExcerpt} />
          <Card title="Project actions" className="post_editor--actions">
            <Link className="btn btn-primary" href={`/projects/project/${project.title}`}>
              See project
            </Link>
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Update
            </button>
          </Card>
        </>
      }
    >
      <PostTitle
        initialTitle={project.title}
        setTitle={setTitle}
        isEditMode={true}
      />
      <Editor
        ref={editorRef}
        editPostData={project}
        featuredPhoto={featuredPhoto}
        onContentChange={(newContent) => setUpdatedContent(newContent)}
      />
    </PostEditorLayout>
  );
};

export async function getServerSideProps(context) {
  const project = await fetchSingleProject(context.params.projectId);

  return {
    props: {
      project,
    },
  };
}

export default EditProject;

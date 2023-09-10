import React, { useRef, useState } from "react";
import Link from "next/link";
import { fetchSinglePost } from "@utils/data-fetching";
import { usePostActions } from "@hooks/posts/usePostActions";
import { useSession } from "next-auth/react";
import PostEditorLayout from "@Dashboard/Posts/PostEditorLayout";
import PostTitle from "@Dashboard/Posts/PostTitle";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";
import PostExcerpt from "@Dashboard/Posts/Excerpt";
import Card from "@Dashboard/Card";

const EditPost = ({ post }) => {
  const [featuredPhoto, setFeaturedPhoto] = useState(post.featuredPhoto);
  const [updatedContent, setUpdatedContent] = useState(post.content); // Initialize with the original content
  const [initialTitle, setInitialTitle] = useState(post.title);
  const [newTitle, setTitle] = useState("");
  const [initialExcerpt, setInitialExcerpt] = useState(post.excerpt);
  const [newExcerpt, setExcerpt] = useState("");
  const { data: session } = useSession();
  const { editPost, isLoading } = usePostActions();

  const editorRef = useRef(null);

  const handleSubmit = async () => {
    const data = {
      id: post.id,
      title: newTitle || initialTitle,
      content: updatedContent,
      featuredPhoto,
      session,
      excerpt: newExcerpt || initialExcerpt,
    };
    await editPost(data);
  };

  return (
    <PostEditorLayout
      sidebarContent={
        <>
          <FeaturedPhoto
            initialPhoto={post.featuredPhoto}
            setFeaturedPhoto={setFeaturedPhoto}
          />
          <PostExcerpt initialExcerpt={post.excerpt} setExcerpt={setExcerpt} />
          <Card title="Post actions" className="post_editor--actions">
            <Link className="btn btn-primary" href={`/blog/post/${post.title}`}>
              See post
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
        initialTitle={post.title}
        setTitle={setTitle}
        isEditMode={true}
      />
      <Editor
        ref={editorRef}
        editPostData={post}
        featuredPhoto={featuredPhoto}
        onContentChange={(newContent) => setUpdatedContent(newContent)}
      />
    </PostEditorLayout>
  );
};

export async function getServerSideProps(context) {
  const post = await fetchSinglePost(context.params.postId);

  return {
    props: {
      post,
    },
  };
}

export default EditPost;

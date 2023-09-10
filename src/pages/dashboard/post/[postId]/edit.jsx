import React, { useRef, useState } from "react";
import { fetchSinglePost } from "@utils/data-fetching";
import { usePostActions } from "@hooks/posts/usePostActions";
import { useSession } from "next-auth/react";
import PostTitle from "@Dashboard/Posts/PostTitle";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";
import PostExcerpt from "@Dashboard/Posts/Excerpt";

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
    <section className="post_creation-wrapper">
      <FeaturedPhoto
        initialPhoto={post.featuredPhoto}
        setFeaturedPhoto={setFeaturedPhoto}
      />
      <div className="create-article">
        <div className="editor_post-title--wrapper">
          <PostTitle
            initialTitle={post.title}
            setTitle={setTitle}
            isEditMode={true}
          />
        </div>
        <Editor
          ref={editorRef}
          editPostData={post}
          featuredPhoto={featuredPhoto}
          onContentChange={(newContent) => setUpdatedContent(newContent)}
        />
      </div>
      <PostExcerpt initialExcerpt={post.excerpt} setExcerpt={setExcerpt} />
      <button disabled={isLoading} onClick={handleSubmit}>
        Update
      </button>
    </section>
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

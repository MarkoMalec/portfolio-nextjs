import React, { useState } from "react";
import { fetchSinglePost } from "@utils/data-fetching";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";

const EditPost = ({ post }) => {
  const [featuredPhoto, setFeaturedPhoto] = useState(post.featuredPhoto);

  // console.log(featuredPhoto, "this is newly uploaded photo for editing post");

  return (
    <section className="post_creation-wrapper">
      <FeaturedPhoto
        initialPhoto={post.featuredPhoto}
        setFeaturedPhoto={setFeaturedPhoto}
      />
      <Editor editPostData={post} featuredPhoto={featuredPhoto} />
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

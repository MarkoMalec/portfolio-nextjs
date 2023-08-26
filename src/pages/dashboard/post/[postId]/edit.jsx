import React, { useState } from "react";
import { fetchSinglePost } from "@utils/data-fetching";
import { useSession } from 'next-auth/react';
import DashboardLayout from "@Dashboard/layout";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";

const EditPost = ({ post }) => {
  const [featuredPhoto, setFeaturedPhoto] = useState(post.featuredPhoto);

  console.log(featuredPhoto, 'this is newly uploaded photo for editing post');

  return (
    <DashboardLayout>
      <section className="post_creation-wrapper">
        <FeaturedPhoto
          initialPhoto={post.featuredPhoto}
          setFeaturedPhoto={setFeaturedPhoto}
        />
        <Editor editPostData={post} featuredPhoto={featuredPhoto} />
      </section>
    </DashboardLayout>
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

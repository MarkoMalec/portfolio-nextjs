import React, { useState } from "react";
import { fetchSinglePost } from "@utils/data-fetching";
import DashboardLayout from "@Dashboard/layout";
import Editor from "@Dashboard/Posts/Editor";

const EditPost = ({ post }) => {
  return (
    <DashboardLayout>
      <Editor editPostData={post} />
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
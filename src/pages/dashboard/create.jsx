import React, { useState } from "react";
import DashboardLayout from "@Dashboard/layout";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";

const NewPost = () => {
  return (
    <DashboardLayout>
      <section className="post_creation-wrapper">
        <FeaturedPhoto />
        <Editor />
      </section>
    </DashboardLayout>
  );
};

export default NewPost;

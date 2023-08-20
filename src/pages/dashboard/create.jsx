import React, { useState } from "react";
import DashboardLayout from "@Dashboard/layout";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";

const NewPost = () => {
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  return (
    <DashboardLayout>
      <section className="post_creation-wrapper">
        <FeaturedPhoto setFeaturedPhoto={setFeaturedPhoto} />
        <Editor featuredPhoto={featuredPhoto} />
      </section>
    </DashboardLayout>
  );
};

export default NewPost;

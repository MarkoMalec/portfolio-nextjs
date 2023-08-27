import React, { useState } from "react";
import Editor from "@Dashboard/Posts/Editor";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";

const NewPost = () => {
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  return (
    <section className="post_creation-wrapper">
      <FeaturedPhoto setFeaturedPhoto={setFeaturedPhoto} />
      <Editor featuredPhoto={featuredPhoto} />
    </section>
  );
};

export default NewPost;

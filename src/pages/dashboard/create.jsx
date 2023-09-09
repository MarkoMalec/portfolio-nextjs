import React, { useState } from "react";
import Editor from "@Dashboard/Posts/Editor";
// import EditorNew from "../../Dashboard/Posts/EditorNew";
import FeaturedPhoto from "@Dashboard/Posts/FeaturedPhoto";

const NewPost = () => {
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  return (
    <section className="post_creation-wrapper">
      <FeaturedPhoto setFeaturedPhoto={setFeaturedPhoto} />
      <Editor featuredPhoto={featuredPhoto} />
      {/* <EditorNew /> */}
    </section>
  );
};

export default NewPost;

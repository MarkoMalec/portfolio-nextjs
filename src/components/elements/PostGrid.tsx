import React from "react";

type PostGridProp = {
  children: any;
};

const PostGrid = ({ children }: PostGridProp) => {
  return (
    <section className="blog_grid--wrapper">
      <div className="post_grid">{children}</div>
    </section>
  ); 
};

export default PostGrid;

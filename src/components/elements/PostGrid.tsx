import React from "react";

type PostGridProp = {
  children: any;
};

const PostGrid = ({ children }: PostGridProp) => {
  return <section className="post_grid">{children}</section>;
};

export default PostGrid;

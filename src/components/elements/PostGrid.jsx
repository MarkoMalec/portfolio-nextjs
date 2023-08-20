import React from "react";

const PostGrid = ({ children }) => {
//   const renderPosts = () => {
//     const gridElements = children.map((element, i) => {
//       return <article key={i}>{element}</article>;
//     });

//     return gridElements;
//   };

  return (
    <section className="post_grid">
        {children}
    </section>
  );
}

export default PostGrid;

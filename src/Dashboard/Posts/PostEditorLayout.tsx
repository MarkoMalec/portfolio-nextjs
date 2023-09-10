import React from "react";
import PostEditorSidebar from "@Dashboard/Posts/PostEditorSidebar";

const PostEditorLayout: React.FC<{
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
}> = ({ children, sidebarContent }) => {
  return (
    <section className="post_editor--wrapper">
      <div className="post_editor--editor">{children}</div>
      <PostEditorSidebar>{sidebarContent}</PostEditorSidebar>
    </section>
  );
};

export default PostEditorLayout;

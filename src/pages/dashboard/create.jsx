import React, { useState } from "react";
import DashboardLayout from "@Dashboard/layout";
import Editor from "@Dashboard/Posts/Editor";

const NewPost = () => {
  return (
    <DashboardLayout>
      <Editor />
    </DashboardLayout>
  );
};

export default NewPost;

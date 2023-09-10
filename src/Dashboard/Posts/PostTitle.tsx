import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

const PostTitle = ({ setTitle, initialTitle, isEditMode }: any) => {
  const [postTitle, setPostTitle] = useState(initialTitle || "");

  useEffect(() => {
    if (initialTitle) {
      setPostTitle(initialTitle);
    }
  }, [initialTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    setPostTitle(newTitle);
    setTitle(newTitle);
  };

  return (
    <TextareaAutosize
      className="editor_post-title"
      spellCheck="false"
      placeholder="Title"
      value={postTitle}
      onChange={handleChange}
    />
  );
};

export default PostTitle;

import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const PostExcerpt = ({ initialExcerpt, setExcerpt }: any) => {
  const [postExcerpt, setPostExcerpt] = useState(initialExcerpt || "");

  useEffect(() => {
    if (initialExcerpt) {
      setPostExcerpt(initialExcerpt);
    }
  }, [initialExcerpt]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExcerpt = e.target.value;
    setPostExcerpt(newExcerpt);
    setExcerpt(newExcerpt);
  };

  return (
    <TextareaAutosize
      className="editor_post-title"
      spellCheck="false"
      placeholder="A short description..."
      value={postExcerpt}
      onChange={handleChange}
    />
  );
};

export default PostExcerpt;

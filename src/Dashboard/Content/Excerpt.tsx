import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Card from "@Dashboard/Card";

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
    <Card title="Short description" className="post_editor--excerpt">
      <TextareaAutosize
        className="editor_post--excerpt"
        spellCheck="false"
        placeholder="A short description..."
        value={postExcerpt}
        onChange={handleChange}
      />
    </Card>
  );
};

export default PostExcerpt;

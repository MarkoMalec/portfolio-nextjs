import React from "react";
import Link from "next/link";
import Image from "next/image";

const PostItem = ({ featuredPhoto, postTitle, postContent }) => {
  const content = JSON.parse(postContent);

  console.log(content);

  return (
    <div className="post_item">
      <Link href={`/blog/post/${postTitle}`}>
        <div className="post_thumbnail">
          <Image src={featuredPhoto} alt={postTitle} layout="fill" sizes="unsized" />
        </div>
        <div className="post_meta">
          <h2>{postTitle}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;

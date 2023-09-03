import React from "react";
import Link from "next/link";
import Image from "next/image";

type PostItemProps = {
  featuredPhoto: string;
  postTitle: string;
  postContent: string;
};

const PostItem = ({ featuredPhoto, postTitle, postContent }: PostItemProps) => {
  const content = JSON.parse(postContent);

  return (
    <div className="post_item">
      <Link href={`/blog/post/${postTitle}`}>
        <div className="post_thumbnail">
          <Image
            src={featuredPhoto ? featuredPhoto : "../assets/placeholder.svg"}
            alt={postTitle}
            fill
            sizes="unsized"
          />
        </div>
        <div className="post_meta">
          <h2>{postTitle}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;

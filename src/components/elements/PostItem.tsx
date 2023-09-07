import React from "react";
import Link from "next/link";
import Image from "next/image";

type PostItemProps = {
  featuredPhoto: string;
  postTitle: string;
  postContent: string;
};

const PostItem = ({ featuredPhoto, postTitle, postContent }: PostItemProps) => {
  // const content = JSON.parse(postContent);
  const formattedPostTitle = postTitle.replace(/ /g, "-");

  return (
    <div className="post_item">
      <Link
        href={`/blog/post/${formattedPostTitle}`}
        className="social cursor-hover-item"
        data-cursor-text="READ"
        data-cursor-text-repeat="8"
      >
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

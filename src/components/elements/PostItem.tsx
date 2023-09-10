import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineClock } from "react-icons/hi";

type PostItemProps = {
  featuredPhoto: string;
  postTitle: string;
  postExcerpt: string;
  date: string;
};

const PostItem = ({
  featuredPhoto,
  postTitle,
  postExcerpt,
  date,
}: PostItemProps) => {
  const formattedPostTitle = postTitle.replace(/ /g, "-");

  const formatDate = (dateString: string) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formattedDate = formatDate(date);

  return (
    <div className="post_item">
      <Link href={`/blog/post/${formattedPostTitle}`}>
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
          <p className="read_time">
            <HiOutlineClock className="inline-block text-base" />
            10 min read
          </p>
          <p suppressHydrationWarning={true} className="date">
            {formattedDate}
          </p>
          <p className="excerpt">{postExcerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;

import React from "react";
import Link from "next/link";
import PostGrid from "../elements/PostGrid";
import PostItem from "../elements/PostItem";

type Posts = {
  id: number;
  featuredPhoto: string;
  title: string;
  content: string;
};

type BlogHomeProps = {
  posts: Posts[];
};

const BlogHome = ({ posts }: BlogHomeProps) => {
  return (
    <section id="blog_section">
      <div className="container blog-loop">
        <p className="section-subtitle">blog</p>
        <h4 className="section-title">Latest Articles</h4>
        <PostGrid>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              featuredPhoto={post.featuredPhoto}
              postTitle={post.title}
              postContent={post.content}
            />
          ))}
        </PostGrid>
        <Link href="/blog" className="btn btn-primary">
            See more posts
        </Link>
      </div>
    </section>
  );
};

export default BlogHome;

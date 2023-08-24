import React from "react";
import { fetchPosts } from "@utils/data-fetching";
import PostGrid from "@components/elements/PostGrid";
import PostItem from "@components/elements/PostItem";

const Blog = ({ posts }) => {
  return (
    <main id="blog" className="container">
      <h1>/blog</h1>
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
    </main>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
}

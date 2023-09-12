import React from "react";
import Head from "next/head";
import { fetchPosts } from "@utils/data-fetching";
import PostGrid from "@components/elements/PostGrid";
import PostItem from "@components/elements/PostItem";

const Blog = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Marko Malec - Blog</title>
        <meta property="og:image" content="https://utfs.io/f/ac32a312-1b8a-42db-a01c-369ed91646dc_IMG_20221001_152017_204.jpg" />
        <meta property="og:url" content="https://markomalec.com/blog" />
        <meta property='og:image:width' content='927' />
        <meta property='og:image:height' content='927' />
      </Head>
      <main id="blog" className="container">
        <h1>/blog</h1>
        <PostGrid>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              featuredPhoto={post.featuredPhoto}
              postTitle={post.title}
              postExcerpt={post.excerpt}
              date={post.PublishedAt}
            />
          ))}
        </PostGrid>
      </main>
    </>
  );
};

export default Blog;

export async function getServerSideProps() {
  try {
    const posts = await fetchPosts();
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

import React from "react";
import Head from "next/head";
import { fetchPosts } from "@utils/data-fetching";
import PostGrid from "@components/elements/PostGrid";
import PostItem from "@components/elements/PostItem";
import useEstimateReadingTime from "~/hooks/posts/useReadingTime";
import usePagination from "@hooks/usePagination";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

const Blog = ({ posts }) => {
  const { currentPage, currentItems, totalPages, paginate } = usePagination(
    1,
    9,
    posts
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Marko Malec - Blog</title>
        <meta
          property="og:image"
          content="https://utfs.io/f/ac32a312-1b8a-42db-a01c-369ed91646dc_IMG_20221001_152017_204.jpg"
        />
        <meta property="og:url" content="https://markomalec.com/blog" />
        <meta property="og:image:width" content="927" />
        <meta property="og:image:height" content="927" />
      </Head>
      <main id="blog" className="container">
        <h1>/blog</h1>
        <PostGrid>
          {currentItems.map((post) => (
            <PostItem
              key={post.id}
              featuredPhoto={post.featuredPhoto}
              postTitle={post.title}
              postExcerpt={post.excerpt}
              date={post.createdAt}
              ttr={useEstimateReadingTime(post.content)}
            />
          ))}
        </PostGrid>
        <button
          className="btn-pagination"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <BiFirstPage />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`btn-pagination ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          className="btn-pagination"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <BiLastPage />
        </button>
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

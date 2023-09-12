import React from "react";
import Link from "next/link";
import PostGrid from "../elements/PostGrid";
import PostItem from "../elements/PostItem";
import usePagination from "@hooks/usePagination";

type Posts = {
  id: number;
  featuredPhoto: string;
  title: string;
  excerpt: string;
  createdAt: string;
};

type BlogHomeProps = {
  posts: Posts[];
};

const BlogHome = ({ posts }: BlogHomeProps) => {
  const { currentPage, currentItems, totalPages, paginate } = usePagination(
    1,
    6,
    posts
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section id="blog_section">
      <div className="container blog-loop">
        <p className="section-subtitle">blog</p>
        <h4 className="section-title">Latest Articles</h4>
        <PostGrid>
          {currentItems.map((post: Posts) => (
            <PostItem
              key={post.id}
              featuredPhoto={post.featuredPhoto}
              postTitle={post.title}
              postExcerpt={post.excerpt}
              date={post.createdAt}
            />
          ))}
        </PostGrid>
        <button
          className="btn-pagination"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
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
          Next
        </button>
        <Link href="/blog" className="btn btn-primary">
          See more posts
        </Link>
      </div>
    </section>
  );
};

export default BlogHome;

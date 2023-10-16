import React from "react";
import Link from "next/link";
import PostGrid from "../elements/PostGrid";
import PostItem from "../elements/PostItem";
import usePagination from "@hooks/usePagination";

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

  const countWords = (text: string) => {
    return text.split(" ").length;
  };

  const estimateReadingTime = (editorjsContentString: string, wpm = 100) => {
    const blocks = JSON.parse(editorjsContentString).blocks;
    let totalWords = 0;

    blocks.forEach((block: any) => {
      if (block.type === "paragraph" || block.type === "header") {
        totalWords += countWords(block.data.text);
      } else if (block.type === "list") {
        block.data.items.forEach((item: any) => {
          totalWords += countWords(item);
        });
      }
    });

    return Math.ceil(totalWords / wpm);
  };

  return (
    <section id="blog_section">
      <div className="container blog-loop">
        <p className="section-subtitle">blog</p>
        <h4 className="section-title">Latest Articles</h4>
        <PostGrid>
          {currentItems.map((post: Post) => {
            const readingTime = estimateReadingTime(post.content);
            return (
              <PostItem
                key={post.id}
                featuredPhoto={post.featuredPhoto}
                postTitle={post.title}
                postExcerpt={post.excerpt}
                date={post.createdAt}
                ttr={readingTime}
              />
            );
          })}
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

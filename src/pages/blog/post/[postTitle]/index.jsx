import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { fetchSinglePost } from "@utils/data-fetching";
import AdminBar from "@components/AdminBar/AdminBar";

import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

function SinglePost({ post }) {
  const contentObject = JSON.parse(post.content);
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta property="og:image" content={`${post.featuredPhoto}`} />
        <meta property="og:image:width" content="927" />
        <meta property="og:image:height" content="927" />
        <meta property="og:type" content="article" />
      </Head>
      <AdminBar>
        <Link href={`/dashboard/post/${post.id}/edit`}>Edit Post</Link>
      </AdminBar>
      <main className="single_post">
        <div className="post_thumbnail">
          <Image
            src={post.featuredPhoto}
            alt="Featured post photo"
            fill
            sizes="unsized"
          />
        </div>
        <section className="container post">
          <article>
            <div className="post_title">
              <h1>{post.title}</h1>
            </div>
            <div className="post_content">
              <Output data={contentObject} />
            </div>
          </article>
          <Link href="/blog">All articles</Link>
        </section>
      </main>
    </>
  );
}

export default SinglePost;

SinglePost.getInitialProps = async (context) => {
  const postTitle = context.query.postTitle.replace(/-/g, " ");
  const post = await fetchSinglePost(undefined, postTitle);
  return { post };
};

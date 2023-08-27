import { fetchPosts } from "@utils/data-fetching";
import PostTable from "@Dashboard/Posts/PostTable";

function PostsPage({ posts }) {
  return <PostTable postsData={posts} />;
}

export default PostsPage;

export async function getServerSideProps() {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
}

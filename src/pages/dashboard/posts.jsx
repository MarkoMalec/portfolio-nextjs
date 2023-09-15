import { fetchPosts } from "@utils/data-fetching";
import ContentTable from "@Dashboard/Content/ContentTable";

function PostsPage({ posts }) {
  return <ContentTable data={posts} />;
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

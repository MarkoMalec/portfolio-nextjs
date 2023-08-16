import { fetchPosts } from "@utils/data-fetching";
import DashboardLayout from "@Dashboard/layout";
import PostTable from "@Dashboard/Posts/PostTable";

function PostsPage({ posts }) {
  return (
    <DashboardLayout>
      <PostTable posts={posts} />
    </DashboardLayout>
  );
}

export default PostsPage;

export async function getStaticProps() {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
}

import { fetchSinglePost } from "@utils/data-fetching";
import DashboardLayout from "@Dashboard/layout";

function SinglePostPage({ post }) {
  return (
    <DashboardLayout>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </DashboardLayout>
  );
}

export default SinglePostPage;

export async function getServerSideProps(context) {
  const post = await fetchSinglePost(context.params.postId);
  return {
    props: {
      post,
    },
  };
}

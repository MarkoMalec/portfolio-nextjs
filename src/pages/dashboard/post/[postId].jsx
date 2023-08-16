import { useRouter } from "next/router";
import DashboardSidebar from "@Dashboard/Sidebar/DashboardSidebar";
import { fetchSinglePost } from "@utils/data-fetching";

function SinglePostPage({ post }) {
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </>
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

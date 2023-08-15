import { useRouter } from "next/router";
import DashboardSidebar from "@Dashboard/Sidebar/DashboardSidebar";
import { fetchSinglePost } from "@utils/data-fetching";

function SinglePostPage({ post }) {
  return (
    <div id="dashboard" className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        {console.log(post)}
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    </div>
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
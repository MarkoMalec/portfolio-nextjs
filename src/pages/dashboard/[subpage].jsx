import { useRouter } from "next/router";
import { fetchPosts } from "@utils/data-fetching";
import DashboardSidebar from "@Dashboard/Sidebar/DashboardSidebar";

// Import your subpage components here
import Posts from "@Dashboard/Posts/Posts";
import NewPost from "@Dashboard/Posts/create";

function DashboardSubpage({ posts }) {
  const router = useRouter();
  const { subpage } = router.query;

  let ContentComponent;

  switch (subpage) {
    case "posts":
      ContentComponent = () => <Posts posts={posts} />;
      break;
    case "create":
      ContentComponent = () => <NewPost />;
      break;
    default:
      ContentComponent = () => <div>Not Found</div>;
  }

  return (
    <div id="dashboard" className="dashboard-container">
      <DashboardSidebar />

      <div className="dashboard-content">
        <ContentComponent />
      </div>
    </div>
  );
}

export default DashboardSubpage;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { subpage: "posts" } },
      { params: { subpage: "create" } },
    ],
    fallback: false, // 404
  };
}

export async function getStaticProps(context) {
  let posts = [];

  if (context.params.subpage === "posts") {
    posts = await fetchPosts();
  }

  return {
    props: {
      posts,
    },
  };
}

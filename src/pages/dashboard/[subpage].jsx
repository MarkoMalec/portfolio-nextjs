import { useRouter } from 'next/router';
import { fetchPosts } from "@utils/data-fetching";
import DashboardSidebar from '@Dashboard/Sidebar/DashboardSidebar';

// Import your subpage components here
import Posts from '@Dashboard/Posts/Posts';

function DashboardSubpage() {
  const router = useRouter();
  const { subpage } = router.query;

  let ContentComponent;

  switch (subpage) {
    case 'posts':
      ContentComponent = Posts;
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

// Example static paths for your subpages
export async function getStaticPaths() {
    return {
      paths: [
        { params: { subpage: 'posts' } },
        // Add more paths if you have other subpages
      ],
      fallback: false // This will result in a 404 for paths not defined above
    };
  }
  
  export async function getStaticProps(context) {
    let posts = [];
    
    if (context.params.subpage === 'posts') {
      posts = await fetchPosts();
      // No need to call .json() again.
    }
  
    return {
      props: {
        posts
      }
    };
}

  
  

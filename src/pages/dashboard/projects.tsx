import { fetchProjects } from "@utils/data-fetching";
import ContentTable from "@Dashboard/Content/ContentTable";

function PostsPage({ projects }: any) {
  return <ContentTable data={projects} />;
}

export default PostsPage;

export async function getServerSideProps() {
  const projects = await fetchProjects();

  return {
    props: {
      projects,
    },
  };
}

import { fetchProjects } from "@utils/data-fetching";
import ProjectsTable from "@Dashboard/Projects/ProjectsTable";

function PostsPage({ projects }: any) {
  return <ProjectsTable projectsData={projects} />;
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

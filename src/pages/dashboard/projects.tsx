import { fetchProjects } from "@utils/data-fetching";
import ContentTable from "@Dashboard/Content/ContentTable";

type ProjectsPageProps = {
  projects: Project[];
}

function PostsPage({ projects }: ProjectsPageProps) {
  return <ContentTable data={projects} />;
}

export default PostsPage;

export async function getServerSideProps() {
  const projects: Project[] = await fetchProjects();

  return {
    props: {
      projects,
    },
  };
}

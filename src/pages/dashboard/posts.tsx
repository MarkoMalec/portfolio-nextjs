import { fetchPosts } from "@utils/data-fetching";
import ContentTable from "@Dashboard/Content/ContentTable";

type PostsPageProps = {
  posts: Post[];
}

const PostsPage = ({ posts }: PostsPageProps) => {
  return <ContentTable data={posts} />;
}

export default PostsPage;

export async function getServerSideProps() {
  const posts: Post[] = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
}

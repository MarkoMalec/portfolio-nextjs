import { fetchPosts } from "@utils/data-fetching";
import DashboardLayout from "@Dashboard/layout";
import PostTable from "@Dashboard/Posts/PostTable";
import { PrismaClient } from "@prisma/client";

function PostsPage({ posts }) {
  return (
    <DashboardLayout>
      <PostTable postsData={posts} />
    </DashboardLayout>
  );
}

export default PostsPage;

// export async function getStaticProps() {
//   const posts = await fetchPosts();

//   return {
//     props: {
//       posts,
//     },
//     revalidate: 60,
//   };
// }

export async function getServerSideProps() {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
}

import { getSession } from "next-auth/react";
import { fetchDailyStats, fetchPosts } from "@utils/data-fetching";
import DailyPosts from "@Charts/DailyPosts";
import ContentTable from "@Dashboard/Content/ContentTable";
import Card from "@Dashboard/Card";

const Dashboard = ({ user, postStats, posts }) => {
  console.table(user);

  return (
    <>
      <h1 className="welcome_title">Welcome {user.name}</h1>
      <section className="griddey">
      <DailyPosts postStats={postStats} />
      <Card title="Posts" size="xxl">
        <ContentTable data={posts} />
      </Card>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const host =
      context.req.headers["x-forwarded-host"] || context.req.headers.host;
    const baseURL = `${protocol}://${host}`;

    const postStats = await fetchDailyStats(baseURL);
    const posts =  await fetchPosts("/api/post");

    return {
      props: {
        session: session,
        user: session.user,
        postStats,
        posts
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        session: null,
        user: null,
        postStats: [],
      },
    };
  }
};

export default Dashboard;

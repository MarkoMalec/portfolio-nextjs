import { useSession, getSession } from "next-auth/react";
import { fetchDailyStats } from "@utils/data-fetching";
import DailyPosts from "@Charts/DailyPosts";
import Link from "next/link";

const Dashboard = ({ user, postStats }) => {
  let session = useSession();

  console.log(user);
  console.log(postStats);
  if (!session) {
    return (
      <div className="not_logged_in">
        <span>You are not logged in!</span>
        <Link className="btn btn-primary" href="/login">
          Login
        </Link>
      </div>
    );
  }


  return (
    <>
      <h1 className="welcome_title">Welcome {user.name}</h1>
      <DailyPosts postStats={postStats} />
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

    return {
      props: {
        session: session,
        user: session.user,
        postStats,
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

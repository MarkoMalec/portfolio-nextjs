import { useSession, getSession } from "next-auth/react";
import { fetchDailyStats } from "@utils/data-fetching";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import Link from "next/link";

ChartJS.register(...registerables);

const Dashboard = ({ user, postStats }) => {
  let session = useSession();

  console.log(user);

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

  const chartData = {
    labels: postStats?.map((stat) => new Date(stat.date).toLocaleDateString()),
    datasets: [
      {
        label: "Posts",
        data: postStats?.map((stat) => stat.post_count),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Post Count",
        },
      },
    },
  };

  return (
    <>
      <h1 className="welcome_title">Welcome {user.name}</h1>
      <section className="daily-posts-block">
        <h5>Daily post count</h5>
        <Line data={chartData} options={options} />
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

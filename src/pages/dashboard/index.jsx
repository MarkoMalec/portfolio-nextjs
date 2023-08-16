import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import DashboardLayout from "@Dashboard/layout";

const Dashboard = ({ user }) => {
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

  return (
    <DashboardLayout>
      <h1>Welcome {user.name}</h1>
    </DashboardLayout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
      user: session.user,
    },
  };
};

export default Dashboard;

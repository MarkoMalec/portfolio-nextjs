// import { useState } from "react";
import DashboardSidebar from "@Dashboard/Sidebar/DashboardSidebar";
// import axios, { AxiosError } from "axios";
// import { useMutation } from "@tanstack/react-query";
import { useSession, getSession, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
import SubpageContent from "./[subpage]";

const Dashboard = ({ user }) => {

  const session = useSession();

  if (!session) {
    return (
      <div>
        You are not logged in!
        <br />
        <a href="/login">Login</a>
      </div>
    );
  }

  return (
    <div id="dashboard" className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <h1>Welcome {user.name}</h1>
      </div>
    </div>
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
      user: session.user,
    },
  };
};

export default Dashboard;

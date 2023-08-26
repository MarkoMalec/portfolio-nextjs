import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardSidebar from "@Dashboard/Sidebar/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);

  return (
    <div id="dashboard" className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;

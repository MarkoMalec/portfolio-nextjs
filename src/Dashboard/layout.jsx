// DashboardLayout.tsx
import React from "react";
import DashboardSidebar from "@Dashboard/Sidebar/DashboardSidebar";

const DashboardLayout = ({ children }) => (
  <div id="dashboard" className="dashboard-container">
    <DashboardSidebar />
    <div className="dashboard-content">{children}</div>
  </div>
);

export default DashboardLayout;

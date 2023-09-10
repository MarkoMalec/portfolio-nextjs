import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardSidebar from "@Dashboard/Sidebar/DashboardSidebar";

const DashboardLayout = ({ children }: any) => {
  const prevChildrenRef = useRef();

  useEffect(() => {
    if (prevChildrenRef.current !== children) {
      const message = sessionStorage.getItem("toastMessage");
      if (message) {
        toast(message);
        sessionStorage.removeItem("toastMessage");
      }
    }
    prevChildrenRef.current = children;
  }, [children]);

  return (
    <div id="dashboard" className="dashboard-container">
      <ToastContainer />
      <DashboardSidebar />
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;

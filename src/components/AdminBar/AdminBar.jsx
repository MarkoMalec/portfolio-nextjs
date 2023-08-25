import React from "react";
import { useSession } from "next-auth/react";

const AdminBar = ({ children }) => {
  const { data: session } = useSession();
  if (session) {
    return <div id="adminbar">{children}</div>;
  } else {
    return null;
  }
};

export default AdminBar;

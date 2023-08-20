import React from "react";
import { useSession } from "next-auth/react";

function AdminBar({ children }) {
  const { data: session } = useSession();
  if (session) {
    return <div id="adminbar">{children}</div>;
  }
  return null;
}

export default AdminBar;

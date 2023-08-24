import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";

interface AdminBarProps {
  children: ReactNode;
}

const AdminBar: React.FC<AdminBarProps> = ({ children }) => {
  const { data: session } = useSession();
  if (session) {
    return <div id="adminbar">{children}</div>;
  } else {
    return null;
  }
};

export default AdminBar;

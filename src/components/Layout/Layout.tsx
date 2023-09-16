import React from "react";
import Header from "@components/Header/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="site-content">{children}</main>
    </>
  );
};

export default Layout;

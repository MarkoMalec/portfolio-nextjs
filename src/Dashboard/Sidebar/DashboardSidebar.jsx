import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


const DashboardSidebar = () => {
    const { data: session } = useSession();
    
    if (!session) {
        return <div>Loading</div>
    }
    const user = session.user;

  return (
    <aside className="sidebar">
        <div className="user_meta">
            <img src={user.image} alt={`${user.name}'s avatar`} />
            <span>{user.name}</span>
        </div>
      <nav className="sidebar-nav">
        <Link href="/dashboard/posts">Posts</Link>
        <a href="/">Test</a>
        <a href="/">Test</a>
        <a href="/">Test</a>
        <a href="/">Test</a>
        <a href="/">Test</a>
      </nav>
      <button className="btn btn-primary" onClick={() => signOut()}>
        Sign out
      </button>
    </aside>
  );
};

export default DashboardSidebar;

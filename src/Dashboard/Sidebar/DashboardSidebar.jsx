import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <aside className="sidebar">
        <img 
          src={user?.image || "/"} 
          alt={user ? `${user.name}'s avatar` : "empty image"} 
        />
      <div className="user_meta">
        <span>{user?.name || "Loading..."}</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link href="/dashboard/posts">Posts</Link>
            <ul>
              <li>
                <Link href="/dashboard/create">+ New post</Link>
              </li>
              <li>
                <Link href="/dashboard/posts">See all</Link>
              </li>
            </ul>
          </li>
        </ul>
        <a href="/">Test</a>
        <a href="/">Test</a>
        <a href="/">Test</a>
        <a href="/">Test</a>
      </nav>
      <button className="btn btn-secondary" onClick={() => signOut()}>
        Sign out
      </button>
    </aside>
  );
};

export default DashboardSidebar;

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  return (
    <aside className="sidebar">
      <div className="user_meta">
        <img 
          src={user?.image || "/"} 
          alt={user ? `${user.name}'s avatar` : "empty image"} 
        />
        <div>
        <span>{user?.name || "Loading..."}</span>
        <span className="user_meta-role">{user?.role}</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
          <Link href="/dashboard" className={router.pathname === "/dashboard" ? "active" : ""}>Home</Link>

          </li>
          <li>
            <Link href="/dashboard/posts" className={router.pathname === "/dashboard/posts" ? "active" : ""}>Posts</Link>
            <ul>
              <li>
                <Link href="/dashboard/create" className={router.pathname === "/dashboard/create"  ? "active" : ""}>+ New post</Link>
              </li>
              <li>
                <Link href="/dashboard/posts"  className={router.pathname === "dashboard/posts"  ? "active" : ""}>See all</Link>
              </li>
            </ul>
          </li>
        </ul>
        <a href="/dashboard">Projects</a>
        <a href="/dashboard">Experiences</a>
      </nav>
      <button className="btn btn-secondary" onClick={() => signOut()}>
        Sign out
      </button>
    </aside>
  );
};

export default DashboardSidebar;

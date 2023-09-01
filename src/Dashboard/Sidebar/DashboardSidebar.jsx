import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};

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
            <ActiveLink href="/dashboard">Home</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/dashboard/posts">Posts</ActiveLink>
            <ul>
              <li>
                <ActiveLink href="/dashboard/create">+ New post</ActiveLink>
              </li>
              <li>
                <ActiveLink href="/dashboard/posts">See all</ActiveLink>
              </li>
            </ul>
          </li>
        </ul>
        <ActiveLink href="/dashboard">Projects</ActiveLink>
        <ActiveLink href="/dashboard">Experiences</ActiveLink>
        <ActiveLink href="/dashboard/users">Users</ActiveLink>
      </nav>
      <button className="btn btn-secondary" onClick={() => signOut()}>
        Sign out
      </button>
    </aside>
  );
};

export default DashboardSidebar;

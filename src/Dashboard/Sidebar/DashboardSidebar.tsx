import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { FaHome, FaPencilAlt, FaProjectDiagram } from 'react-icons/fa';
import { FaListOl, FaUsers } from 'react-icons/fa6';
import { GrArticle } from 'react-icons/gr';
import { AiTwotoneExperiment } from 'react-icons/ai';

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
};

const ActiveLink = ({ href, children }: ActiveLinkProps) => {
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
            <ActiveLink href="/dashboard"><FaHome />Home</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/dashboard/posts"><GrArticle />Posts</ActiveLink>
            <ul>
              <li>
                <ActiveLink href="/dashboard/post/create"><FaPencilAlt /> New post</ActiveLink>
              </li>
              <li>
                <ActiveLink href="/dashboard/posts"><FaListOl />See all</ActiveLink>
              </li>
            </ul>
          </li>
        </ul>
        <ActiveLink href="/dashboard/projects"><FaProjectDiagram />Projects</ActiveLink>
        <ActiveLink href="/dashboard"><AiTwotoneExperiment />Experiences</ActiveLink>
        <ActiveLink href="/dashboard/users"><FaUsers />Users</ActiveLink>
      </nav>
      <button className="btn btn-primary" onClick={() => signOut()}>
        Sign out
      </button>
    </aside>
  );
};

export default DashboardSidebar;

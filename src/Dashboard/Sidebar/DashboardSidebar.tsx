import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { FaHome, FaPencilAlt, FaProjectDiagram } from "react-icons/fa";
import { FaListOl, FaUsers } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import { AiTwotoneExperiment, AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";

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
  const [expandedSections, setExpandedSections] = useState({});

  const { data: session } = useSession();
  const user = session?.user;

  const toggleExpand = (section: any) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

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
            <ActiveLink href="/dashboard">
              <FaHome />
              Home
            </ActiveLink>
          </li>
          <li className="has_children">
            <ActiveLink href="/dashboard/posts">
              <GrArticle />
              Posts
              <BsChevronExpand
                className="expand"
                onClick={() => toggleExpand("Posts")}
              />
            </ActiveLink>
            <ul
              className={`submenu ${
                expandedSections["Posts"] ? "submenu-open" : "submenu-closed"
              }`}
            >
              <li>
                <ActiveLink href="/dashboard/post/create">
                  <FaPencilAlt /> New post
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href="/dashboard/posts">
                  <FaListOl />
                  See all
                </ActiveLink>
              </li>
            </ul>
          </li>
          <li className="has_children">
            <ActiveLink href="/dashboard/projects">
              <AiTwotoneExperiment />
              Projects
              <BsChevronExpand
                className="expand"
                onClick={() => toggleExpand("Projects")}
              />
            </ActiveLink>
            <ul
              className={`submenu ${
                expandedSections["Projects"] ? "submenu-open" : "submenu-closed"
              }`}
            >
              <li>
                <ActiveLink href="/dashboard/project/create">
                  <AiOutlineAppstoreAdd />
                  New Project
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href="/dashboard/projects">
                  <FaListOl />
                  See all
                </ActiveLink>
              </li>
            </ul>
          </li>
          <ActiveLink href="/dashboard">
            <FaProjectDiagram />
            Experiences
          </ActiveLink>
          <ActiveLink href="/dashboard/users">
            <FaUsers />
            Users
          </ActiveLink>
        </ul>
      </nav>
      <button className="btn btn-primary" onClick={() => signOut()}>
        Sign out
      </button>
    </aside>
  );
};

export default DashboardSidebar;

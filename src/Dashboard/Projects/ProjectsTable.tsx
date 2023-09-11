import React, { useState } from "react";
import Link from "next/link";
// import PostSettings from "./PostSettings";
import { BiSort } from "react-icons/bi";

const ProjectsTable = ({ projectsData }: any) => {
  const [projects, setProjects] = useState(projectsData);
  console.log(projects);
  const [sortConfig, setSortConfig] = useState({
    key: "id", // default sort by id
    direction: "descending",
  });

  //   Convert ISO string dates to JavaScript Date objects
  const formattedProjects = projects.map((project) => ({
    ...project,
    createdAt: new Date(project.createdAt).toDateString(),
    updatedAt: new Date(project.updatedAt).toDateString(),
  }));

  const sortedProjects = [...formattedProjects].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleDelete = (deletedPostId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== deletedPostId)
    );
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="projects_list">
      <table id="projects_table">
        <thead>
          <tr>
            <th>
              <button className="btn" onClick={() => requestSort("title")}>
                Title <BiSort />
              </button>
            </th>
            <th>
              <button className="btn" onClick={() => requestSort("createdAt")}>
                Created At <BiSort />
              </button>
            </th>
            <th>
              <button className="btn" onClick={() => requestSort("updatedAt")}>
                Updated At <BiSort />
              </button>
            </th>
            <th>
              <button className="btn" onClick={() => requestSort("Author")}>
                Author <BiSort />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="project_name-column">
                <Link href={`/dashboard/project/${project.id}/edit`}>
                  {project.title}
                </Link>
                {/* <PostSettings
                  projectid={project.id}
                  onDelete={() => handleDelete(project.id)}
                /> */}
              </td>
              <td>{project.createdAt}</td>
              <td>{project.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;

import React, { useState } from "react";
import Link from "next/link";
import TableSettings from "./TableSettings";
import { BiSort } from "react-icons/bi";

const ContentTable: React.FC<{ data: any[] }> = ({ data }) => {
  const [contents, setContents] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "descending",
  });

  // Sorting function
  const sortedContents = [...contents].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleDelete = (deletedContentId: number) => {
    setContents((prevContent) =>
      prevContent.filter((content) => content.id !== deletedContentId)
    );
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="contents_list">
      <table id="contents_table">
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
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {sortedContents.map((content) => (
            <tr key={content.id}>
              <td className="content_name-column">
                <Link href={`/dashboard/${content.type}/${content.id}/edit`}>
                  {content.title}
                </Link>
                <TableSettings
                  contentType={content.type}
                  postid={content.id}
                  onDelete={() => handleDelete(content.id)}
                />
              </td>
              <td>{content.createdAt}</td>
              <td>{content.updatedAt}</td>
              <td>{content.author?.name}</td>
              <td>{content.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;

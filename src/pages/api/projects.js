import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    const { id, title, type } = req.query;
    console.log("Incoming request for Projects:", req.query);

    if (id && id !== "undefined") {
      try {
        const singleProject = await prisma.projects.findUnique({
          where: {
            id: parseInt(id, 10),
          },
          include: {
            author: true,
          },
        });

        if (!singleProject) {
          return res.status(404).json({ error: "Post not found." });
        }

        return res.status(200).json(singleProject);
      } catch (error) {
        console.error("Error fetching single projects by ID:", error);
        return res.status(500).json({
          error: `Failed to fetch projects. Reasons ${error.message}`,
        });
      }
    } else if (title && title.trim() !== "") {
      const decodedTitle = decodeURIComponent(title);
      const formattedTitle = decodedTitle.replace(/-/g, " ");

      try {
        const singleProject = await prisma.projects.findFirst({
          where: {
            title: {
              equals: formattedTitle,
            },
          },
          include: {
            author: true,
          },
        });

        if (!singleProject) {
          return res.status(404).json({ error: "Post not found." });
        }

        return res.status(200).json(singleProject);
      } catch (error) {
        console.error("Error fetching single projects by title:", error);
        return res.status(500).json({
          error: `Failed to fetch projects. Reason: ${error.message}`,
        });
      }
    } else {
      try {
        const projects = await prisma.projects.findMany();
        res.json(projects);
      } catch (error) {
        res.status(500).json({ error: "Unable to fetch experiences." });
      }
    }
  }

  return res.status(405).end();
}

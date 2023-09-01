import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    if (req.method === "GET") {
      const projects = await prisma.projects.findMany();
      res.json(projects);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch experiences." });
  }
}

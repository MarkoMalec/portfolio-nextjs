import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // const { id, name, email, image, role } = req.query;

    try {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .json({ error: `Failed to fetch users. Reason: ${error.message}` });
    }
  }
}

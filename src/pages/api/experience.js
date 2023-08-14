import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    if (req.method === 'GET') {
      const experiences = await prisma.experience.findMany();
      res.json(experiences);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch experiences." });
  } finally {
    await prisma.$disconnect(); // Ensure that the Prisma Client connection is closed after the call
  }
}
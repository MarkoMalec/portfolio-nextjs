import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        console.log(session);

        if (!session) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        const { title, content } = req.body;

        const prisma = new PrismaClient();

        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: session.user.id,
                },
            });

            return res.status(201).json(newPost);
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ error: "Failed to create post." });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end(); // Method Not Allowed for anything other than POST
    }
}
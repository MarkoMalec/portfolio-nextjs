import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed for anything other than POST
    }

    const { title, content, session } = req.body;

    // Check if session exists and if it has a user
    if (!session || !session.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    // Check if title and content are provided
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

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
    }
}

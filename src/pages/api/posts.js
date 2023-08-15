import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query; // Get the id query parameter

        if (id) {
            // If an ID is provided, fetch a single post
            try {
                const singlePost = await prisma.post.findUnique({
                    where: {
                        id: parseInt(id, 10),
                    }
                });

                if (!singlePost) {
                    return res.status(404).json({ error: "Post not found." });
                }

                return res.status(200).json(singlePost);
            } catch (error) {
                console.error('Error fetching single post:', error);
                return res.status(500).json({ error: "Failed to fetch post." });
            }
        } else {
            // If no ID is provided, fetch all posts
            try {
                const posts = await prisma.post.findMany();
                return res.status(200).json(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                return res.status(500).json({ error: "Failed to fetch posts." });
            }
        }
    }
    
    if (req.method === 'POST') {
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

    // Handle unsupported methods
    return res.status(405).end(); // Method Not Allowed for unsupported methods
}

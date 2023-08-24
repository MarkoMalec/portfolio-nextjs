import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id, title } = req.query; // Get the id query parameter

    if (id && id !== "undefined") {
      // If an ID or Title is provided, fetch a single post
      try {
        const singlePost = await prisma.post.findUnique({
          where: {
            id: parseInt(id, 10),
          },
        });

        if (!singlePost) {
          return res.status(404).json({ error: "Post not found." });
        }

        return res.status(200).json(singlePost);
      } catch (error) {
        console.error("Error fetching single post by ID:", error);
        return res
          .status(500)
          .json({ error: `Failed to fetch post. Reasons ${error.message}` });
      }
    } else if (title && title.trim() !== "") {
      const decodedTitle = decodeURIComponent(title);

      try {
        const singlePost = await prisma.post.findFirst({
          where: {
            title: {
              equals: decodedTitle,
            },
          },
        });

        if (!singlePost) {
          return res.status(404).json({ error: "Post not found." });
        }

        return res.status(200).json(singlePost);
      } catch (error) {
        console.error("Error fetching single post by title:", error);
        return res
          .status(500)
          .json({ error: `Failed to fetch post. Reason: ${error.message}` });
      }
    } else {
      // If no ID is provided, fetch all posts
      try {
        const posts = await prisma.post.findMany();
        return res.status(200).json(posts);
      } catch (error) {
        console.error("Error fetching posts by whatever:", error);
        return res
          .status(500)
          .json({ error: `Failed to fetch posts. reason: ${error.message}` });
      }
    }
  }

  if (req.method === "POST") {
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
      const postData = {
        title,
        content: JSON.stringify(content),
        author: {
          connect: { id: session.user.id }
        },
        featuredPhoto: req.body.featuredPhoto || null
      };
      
      const newPost = await prisma.post.create({
        data: postData
      });
      

      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Failed to create post." });
    }
  }

  if (req.method === "PATCH") {
    const { id, title, content, session, featuredPhoto } = req.body;

    // Check if session exists and if it has a user
    if (!session || !session.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Check if title, content, and id are provided
    if (!title || !content || !id) {
      return res
        .status(400)
        .json({ error: "Title, content, and post ID are required." });
    }

    try {
      // Check if the post exists and belongs to the user
      const existingPost = await prisma.post.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingPost) {
        return res.status(404).json({ error: "Post not found." });
      }

      if (existingPost.authorId !== session.user.id) {
        return res
          .status(403)
          .json({ error: "You don't have permission to edit this post." });
      }

      // Update the post
      const updatedPost = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title,
          content: JSON.stringify(content),
          featuredPhoto: featuredPhoto,
        },
      });

      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      return res.status(500).json({ error: "Failed to update post." });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body; // Get the ID from the request body or query params

    if (!id) {
      return res.status(400).json({ error: "ID is required." });
    }

    try {
      await prisma.post.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
      return res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ error: "Failed to delete post." });
    }
  }

  // Handle unsupported methods
  return res.status(405).end(); // Method Not Allowed for unsupported methods
}

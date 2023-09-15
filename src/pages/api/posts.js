import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {

  const formatDates = (post) => {
    return {
      ...post,
      createdAt: new Date(post.createdAt).toDateString(),
      updatedAt: new Date(post.updatedAt).toDateString(),
    };
  };

  if (req.method === "GET") {
    const { id, title, type } = req.query;
    console.log("Incoming request:", req.query);

    if (type === "dailyStats") {
      try {
        const dailyStats =
          await prisma.$queryRaw`SELECT DATE(createdAt) as date, COUNT(*) as post_count FROM Post GROUP BY DATE(createdAt) ORDER BY DATE(createdAt) DESC;`;

        const serializedStats = dailyStats.map((stat) => ({
          ...stat,
          post_count: stat.post_count.toString(),
        }));

        return res.status(200).json(serializedStats);
      } catch (error) {
        console.error("Error fetching daily statistics:", error);
        return res.status(500).json({
          error: `Failed to fetch daily statistics. Reason: ${error.message}`,
        });
      }
    } else if (id && id !== "undefined") {
      try {
        const singlePost = await prisma.post.findUnique({
          where: {
            id: parseInt(id, 10),
          },
          include: {
            author: true,
          },
        });

        if (!singlePost) {
          return res.status(404).json({ error: "Post not found." });
        }

        const formattedSinglePost = formatDates(singlePost);

        return res.status(200).json(formattedSinglePost);
      } catch (error) {
        console.error("Error fetching single post by ID:", error);
        return res
          .status(500)
          .json({ error: `Failed to fetch post. Reasons ${error.message}` });
      }
    } else if (title && title.trim() !== "") {
      const decodedTitle = decodeURIComponent(title);
      const formattedTitle = decodedTitle.replace(/-/g, ' ');

      try {
        const singlePost = await prisma.post.findFirst({
          where: {
            title: {
              equals: formattedTitle,
            },
          },
          include: {
            author: true,
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
      try {
        const posts = await prisma.post.findMany({
          include: {
            author: true,
          },
        });

        const formattedPosts = posts.map(formatDates);

        return res.status(200).json(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        return res
          .status(500)
          .json({ error: `Failed to fetch posts. Reason: ${error.message}` });
      }
    }
  }

  if (req.method === "POST") {
    const { title, content, session, excerpt } = req.body;

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
          connect: { id: session.user.id },
        },
        featuredPhoto: req.body.featuredPhoto || null,
        excerpt,
      };

      const newPost = await prisma.post.create({
        data: postData,
      });

      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Failed to create post." });
    }
  }

  if (req.method === "PATCH") {
    console.log("PATCH request body:", req.body);
    const { id, title, content, session, featuredPhoto, excerpt } = req.body;

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

      // Update the post
      const updatedPost = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title,
          content: content,
          featuredPhoto: featuredPhoto,
          excerpt: excerpt
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

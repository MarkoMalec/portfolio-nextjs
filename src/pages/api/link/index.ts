import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const href = req.query.url as string;

    if (!href) {
      return res.status(400).json({ error: 'Invalid href' });
    }

    try {
      const response = await axios.get(href);

      // Parse the HTML using regular expressions
      const titleMatch = response.data.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '';

      const descriptionMatch = response.data.match(
        /<meta name="description" content="(.*?)"/
      );
      const description = descriptionMatch ? descriptionMatch[1] : '';

      const imageMatch = response.data.match(/<meta property="og:image" content="(.*?)"/);
      const imageUrl = imageMatch ? imageMatch[1] : '';

      // Return the data in the format required by the editor tool
      return res.status(200).json({
        success: 1,
        meta: {
          title,
          description,
          image: {
            url: imageUrl,
          },
        },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch the URL' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' }); // Handle methods other than GET
  }
}

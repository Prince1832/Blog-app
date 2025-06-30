import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Post from '@/lib/models/Post';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  await dbConnect();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const post = await Post.findOne({ slug, user: decoded.userId });
    if (!post) return res.status(404).json({ error: 'Post not found or unauthorized' });

    if (req.method === 'GET') {
      return res.json(post);
    }

    if (req.method === 'PUT') {
      const { title, content } = req.body;

      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt'],
        },
      });

      const updatedPost = await Post.findOneAndUpdate(
        { slug, user: decoded.userId },
        { title, content: sanitizedContent },
        { new: true }
      );

      return res.json(updatedPost);
    }

    if (req.method === 'DELETE') {
      await Post.findOneAndDelete({ slug, user: decoded.userId });
      return res.json({ message: 'Post deleted' });
    }

    res.status(405).end();
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

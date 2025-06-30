import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Post from '@/lib/models/Post';
import slugify from 'slugify';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  if (req.method === 'GET') {
    try {
      const posts = await Post.find({ user: decoded.userId }).sort({ createdAt: -1 });
      return res.status(200).json(posts);
    } catch (err) {
      console.error('Fetch posts error:', err);
      return res.status(500).json({ message: 'Failed to fetch posts' });
    }
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const slug = slugify(title, { lower: true });

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt'],
      },
    });

    try {
      const newPost = await Post.create({
        title,
        content: sanitizedContent,
        slug,
        user: decoded.userId,
      });

      return res.status(201).json(newPost);
    } catch (err) {
      console.error('Post creation error:', err);
      return res.status(500).json({ error: 'Failed to create post' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}

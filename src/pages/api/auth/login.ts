import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET not set in .env' });
  }

  await dbConnect();

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.status(401).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: user._id, email: user.email },
  });
}
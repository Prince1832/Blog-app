import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword, username });

  
  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
    expiresIn: '7d',
  });

 
  res.status(201).json({ message: 'User registered', token });
}

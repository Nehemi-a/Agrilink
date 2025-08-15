import { Router } from 'express';
import { db } from '../db';
import type { User } from '../types';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // In a real app, hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.users.create({ fullName, email, password });

    const userToReturn: User = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
    };

    res.status(201).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await db.users.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // In a real app, compare hashed password
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = user.password === password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const userToReturn: User = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    res.status(200).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
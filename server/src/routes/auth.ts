import { Router } from 'express';
import { db } from '../db';
import type { User, UserRole } from '../types';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { fullName, email, password, role, phone, location } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'Full name, email, password, and role are required' });
  }

  // Validate role
  const validRoles: UserRole[] = ['seller', 'buyer', 'logistics'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be seller, buyer, or logistics' });
  }

  try {
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // In a real app, hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.users.create({ 
      fullName, 
      email, 
      password, 
      role, 
      phone, 
      location 
    });

    const userToReturn: User = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      location: newUser.location,
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
      role: user.role,
      phone: user.phone,
      location: user.location,
    };

    res.status(200).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

// PUT /api/auth/profile
router.put('/profile', async (req, res) => {
  const { id, fullName, phone, location } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const updatedUser = await db.users.update(id, { fullName, phone, location });
    
    const userToReturn: User = {
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      location: updatedUser.location,
    };

    res.status(200).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

export default router;
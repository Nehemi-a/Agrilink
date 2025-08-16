import { Router } from 'express';
import multer from 'multer';
import { db } from '../db.js';
import type { User, UserRole } from '../types.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/register', async (req, res) => {
  const { fullName, email, password, role, phone, location } = req.body;
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existingUser = await db.users.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const newUser = await db.users.create({ fullName, email, password, role, phone, location });
  res.status(201).json(newUser);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json(user);
});

router.put('/profile', upload.single('avatar'), async (req, res) => {
  const { id, fullName, phone, location } = req.body;
  const avatar = req.file ? req.file.path.replace(/\\/g, '/') : undefined;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const updatedUser = await db.users.update(id, { fullName, phone, location, avatar });
  res.status(200).json(updatedUser);
});

export default router;
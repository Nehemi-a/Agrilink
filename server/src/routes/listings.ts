import { Router } from 'express';
import multer from 'multer';
import { db } from '../db.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/listings/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const listings = await db.listings.getAll();
  res.status(200).json(listings);
});

router.post('/', upload.array('images', 5), async (req, res) => {
  const { sellerName, cropType, quantity, quality, location, pricePerUnit, contactDetails } = req.body;
  if (!sellerName || !cropType || !quantity || !quality || !location || !pricePerUnit) {
    return res.status(400).json({ message: 'All listing fields are required' });
  }
  const images = (req.files as Express.Multer.File[])?.map(file => file.path.replace(/\\/g, '/'));
  const newListing = await db.listings.create({
    sellerName,
    cropType,
    quantity,
    quality,
    location,
    pricePerUnit,
    images,
    contactDetails: JSON.parse(contactDetails),
  });
  res.status(201).json(newListing);
});

export default router;
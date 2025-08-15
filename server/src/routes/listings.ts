import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/listings
router.get('/', async (req, res) => {
  try {
    const listings = await db.listings.getAll();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch listings' });
  }
});

// POST /api/listings
router.post('/', async (req, res) => {
  const { sellerName, cropType, quantity, quality, location, pricePerUnit } = req.body;

  if (!sellerName || !cropType || !quantity || !quality || !location || !pricePerUnit) {
    return res.status(400).json({ message: 'All listing fields are required' });
  }

  try {
    const newListing = await db.listings.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create new listing' });
  }
});

export default router;
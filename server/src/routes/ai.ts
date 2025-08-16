import { Router } from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import type { ProduceData } from '../types.js';

const router = Router();

router.post('/market-analysis', async (req, res) => {
  const data: ProduceData = req.body;
  if (!data || !data.cropType || !data.quantity || !data.quality || !data.location) {
    return res.status(400).json({ message: 'Invalid produce data provided.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ message: 'AI analysis is disabled.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Analyze the market for ${data.quantity} of ${data.quality} ${data.cropType} from ${data.location}, Kenya. Provide a suggested price, market demand, best selling time, and potential buyers.`;
    
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();
    
    // This is a simplified response. In a real app, you'd parse this more robustly.
    res.status(200).json({ overallSummary: analysis });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get market analysis.' });
  }
});

export default router;
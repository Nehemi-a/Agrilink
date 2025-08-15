import { Router } from 'express';
import { GoogleGenAI, Type } from "@google/genai";
import type { ProduceData } from '../types';

const router = Router();

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    suggestedPricePerUnit: {
      type: Type.STRING,
      description: "A suggested price per unit (e.g., per kg, per bushel) for the specified crop. Example: 'KES 2500 per 90kg bag'",
    },
    priceJustification: {
      type: Type.STRING,
      description: "A brief explanation for the suggested price, considering quality, location, and current market conditions in Kenya.",
    },
    marketDemand: {
      type: Type.STRING,
      enum: ['High', 'Medium', 'Low', 'Stable'],
      description: "The current market demand for this crop in Kenya.",
    },
    demandJustification: {
      type: Type.STRING,
      description: "A brief explanation for the demand level.",
    },
    bestSellingTime: {
      type: Type.STRING,
      description: "The optimal time frame to sell the produce for maximum profit. Example: 'Next 2-4 weeks'",
    },
    sellingTimeJustification: {
        type: Type.STRING,
        description: "An explanation for why this is the best time to sell."
    },
    potentialBuyers: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of potential buyer types in Kenya. Example: ['Local Millers', 'Nairobi Wholesale Markets', 'Export Companies']",
    },
    buyersJustification: {
        type: Type.STRING,
        description: "A brief explanation of why these buyers are suitable."
    },
    overallSummary: {
      type: Type.STRING,
      description: "A concise, actionable summary of the market analysis for the Kenyan farmer.",
    },
  },
  required: [
    "suggestedPricePerUnit",
    "priceJustification",
    "marketDemand",
    "demandJustification",
    "bestSellingTime",
    "sellingTimeJustification",
    "potentialBuyers",
    "buyersJustification",
    "overallSummary",
  ],
};

// POST /api/ai/market-analysis
router.post('/market-analysis', async (req, res) => {
    const data: ProduceData = req.body;
    if (!data || !data.cropType || !data.quantity || !data.quality || !data.location) {
        return res.status(400).json({ message: 'Invalid produce data provided.' });
    }

    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable not set. AI analysis is disabled.");
      return res.status(500).json({ message: 'Server is not configured for AI analysis. An API key is required.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
        Analyze the agricultural market in Kenya for the following produce and provide actionable insights for a Kenyan farmer.

        Produce Details:
        - Crop: ${data.cropType}
        - Quantity: ${data.quantity}
        - Quality: ${data.quality}
        - Location: ${data.location} (within Kenya)

        Based on these details, provide a detailed market analysis relevant to the Kenyan market.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.5,
            }
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        res.status(200).json(parsedResponse);
    } catch (error) {
        console.error("Error fetching market analysis from Gemini API:", error);
        res.status(500).json({ message: "Failed to get market analysis. The AI model may be temporarily unavailable." });
    }
});

export default router;
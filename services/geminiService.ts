
import type { ProduceData, MarketAnalysis } from '../types';

// Dynamically set the API host to match the hostname used to access the app.
// This works for both `localhost` and when accessing via a local network IP on a mobile device.
const API_BASE_URL = '';

export const getMarketAnalysis = async (data: ProduceData): Promise<MarketAnalysis> => {
  try {
    const response = await fetch(`/api/ai/market-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get market analysis from the server.');
    }
    
    const analysis: MarketAnalysis = await response.json();
    return analysis;

  } catch (error) {
    console.error("Error fetching market analysis from backend:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get market analysis. ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching market analysis.");
  }
};

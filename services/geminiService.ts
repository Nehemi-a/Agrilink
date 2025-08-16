
import type { ProduceData, MarketAnalysis } from '../types';

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
      // Attempt to get a more specific error message from the response body.
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // The response body was not valid JSON, the status is the best we have.
      }
      throw new Error(errorMessage);
    }
    
    return await response.json() as MarketAnalysis;

  } catch (error) {
    console.error("Error fetching market analysis:", error);
    if (error instanceof Error) {
        // Wrapping the original error provides more context for debugging.
        throw new Error(`Failed to get market analysis: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching market analysis.");
  }
};


import React from 'react';
import type { MarketAnalysis } from '../types';
import { AnalysisCard } from './AnalysisCard';
import { PriceTagIcon } from './icons/PriceTagIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { UsersIcon } from './icons/UsersIcon';

interface AnalysisDisplayProps {
  analysis: MarketAnalysis;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
          <h3 className="text-xl md:text-2xl font-bold text-emerald-800 mb-4">Overall Summary</h3>
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <p className="text-slate-700 leading-relaxed">{analysis.overallSummary}</p>
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalysisCard
          icon={<PriceTagIcon className="h-8 w-8 text-emerald-600" />}
          title="Suggested Price"
          value={analysis.suggestedPricePerUnit}
          description={analysis.priceJustification}
        />
        <AnalysisCard
          icon={<ChartBarIcon className="h-8 w-8 text-amber-600" />}
          title="Market Demand"
          value={analysis.marketDemand}
          description={analysis.demandJustification}
          valueClassName={
            analysis.marketDemand === 'High' ? 'text-emerald-600' :
            analysis.marketDemand === 'Medium' ? 'text-amber-600' : 'text-red-600'
          }
        />
        <AnalysisCard
          icon={<CalendarIcon className="h-8 w-8 text-sky-600" />}
          title="Best Selling Time"
          value={analysis.bestSellingTime}
          description={analysis.sellingTimeJustification}
        />
        <AnalysisCard
          icon={<UsersIcon className="h-8 w-8 text-violet-600" />}
          title="Potential Buyers"
          value={analysis.potentialBuyers.join(', ')}
          description={analysis.buyersJustification}
        />
      </div>
    </div>
  );
};
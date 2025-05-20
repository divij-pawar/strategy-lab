import React from 'react';
import { StockData } from '../types';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar } from 'lucide-react';

interface StockInfoProps {
  stock: StockData;
}

const StockInfo: React.FC<StockInfoProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <div className="p-4 bg-slate-800 border-b border-slate-700">
      <div className="flex flex-wrap items-start">
        {/* Price and change */}
        <div className="mr-8">
          <div className="flex items-center mb-1">
            <span className="text-3xl font-bold">${stock.price.toFixed(2)}</span>
            <span className={`ml-2 text-lg ${isPositive ? 'text-success-500' : 'text-error-500'} flex items-center`}>
              {isPositive ? <TrendingUp size={18} className="mr-1" /> : <TrendingDown size={18} className="mr-1" />}
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="text-sm text-slate-400">
            Last Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {/* Key stats */}
        <div className="flex flex-wrap gap-6">
          <div className="min-w-32">
            <div className="flex items-center text-slate-400 mb-1">
              <DollarSign size={16} className="mr-1" />
              <span>Trading Info</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="text-slate-400">Open</div>
              <div>${stock.open.toFixed(2)}</div>
              <div className="text-slate-400">High</div>
              <div>${stock.high.toFixed(2)}</div>
              <div className="text-slate-400">Low</div>
              <div>${stock.low.toFixed(2)}</div>
              <div className="text-slate-400">Close</div>
              <div>${stock.close.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="min-w-32">
            <div className="flex items-center text-slate-400 mb-1">
              <BarChart3 size={16} className="mr-1" />
              <span>Volume</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="text-slate-400">Volume</div>
              <div>{(stock.volume / 1000000).toFixed(2)}M</div>
              <div className="text-slate-400">Market Cap</div>
              <div>${(stock.marketCap! / 1000000000).toFixed(2)}B</div>
            </div>
          </div>
          
          <div className="min-w-32">
            <div className="flex items-center text-slate-400 mb-1">
              <Calendar size={16} className="mr-1" />
              <span>Fundamentals</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="text-slate-400">P/E Ratio</div>
              <div>{stock.peRatio?.toFixed(2)}</div>
              <div className="text-slate-400">EPS</div>
              <div>${stock.eps?.toFixed(2)}</div>
              <div className="text-slate-400">Dividend</div>
              <div>${stock.dividend?.toFixed(2)} ({stock.yield?.toFixed(2)}%)</div>
            </div>
          </div>
        </div>
      </div>
    )
    </div>
  );
};

export default StockInfo;
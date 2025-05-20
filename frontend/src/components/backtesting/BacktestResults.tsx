import React from 'react';
import { BacktestResult, ChartData } from '../../types';
import { ArrowUp, ArrowDown, Calendar, DollarSign, BarChart3, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface BacktestResultsProps {
  result: BacktestResult;
  historicalData: ChartData[];
}

const BacktestResults: React.FC<BacktestResultsProps> = ({ result, historicalData }) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Prepare data for equity curve
  const equityData = result.equity.map(item => ({
    date: item.date,
    equity: item.equity,
  }));

  // Highlight buy/sell points on the chart
  const priceDataWithTrades = historicalData.map(dataPoint => {
    const trade = result.trades.find(trade => trade.date === dataPoint.date);
    return {
      ...dataPoint,
      buyPoint: trade?.type === 'buy' ? dataPoint.close : null,
      sellPoint: trade?.type === 'sell' ? dataPoint.close : null,
    };
  });

  return (
    <div className="p-4 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">
        {result.strategyName} Results
      </h3>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="flex items-center text-slate-400 text-sm mb-1">
            <Calendar size={14} className="mr-1" />
            Time Period
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              {new Date(result.startDate).toLocaleDateString()} - {new Date(result.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="flex items-center text-slate-400 text-sm mb-1">
            <DollarSign size={14} className="mr-1" />
            Total Return
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-semibold mr-2">
              {result.totalReturn.toFixed(2)}%
            </div>
            <div className={`flex items-center ${result.totalReturn >= 0 ? 'text-success-500' : 'text-error-500'}`}>
              {result.totalReturn >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </div>
          </div>
          <div className="text-sm text-slate-400 mt-1">
            {formatCurrency(result.initialCapital)} → {formatCurrency(result.finalCapital)}
          </div>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="flex items-center text-slate-400 text-sm mb-1">
            <BarChart3 size={14} className="mr-1" />
            Max Drawdown
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-semibold mr-2 text-error-500">
              {result.maxDrawdown.toFixed(2)}%
            </div>
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Peak-to-trough decline
          </div>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="flex items-center text-slate-400 text-sm mb-1">
            <TrendingUp size={14} className="mr-1" />
            Sharpe Ratio
          </div>
          <div className="text-2xl font-semibold">
            {result.sharpeRatio.toFixed(2)}
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Risk-adjusted return
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Equity Curve</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94A3B8' }}
                  axisLine={{ stroke: '#475569' }}
                  tickLine={{ stroke: '#475569' }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fill: '#94A3B8' }}
                  axisLine={{ stroke: '#475569' }}
                  tickLine={{ stroke: '#475569' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderColor: '#475569',
                    color: '#E2E8F0',
                  }}
                  labelStyle={{ color: '#94A3B8' }}
                  formatter={(value) => [formatCurrency(Number(value)), 'Equity']}
                />
                <Area 
                  type="monotone" 
                  dataKey="equity" 
                  stroke="#3B82F6" 
                  fill="url(#colorEquity)" 
                />
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Trading Signals</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceDataWithTrades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94A3B8' }}
                  axisLine={{ stroke: '#475569' }}
                  tickLine={{ stroke: '#475569' }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fill: '#94A3B8' }}
                  axisLine={{ stroke: '#475569' }}
                  tickLine={{ stroke: '#475569' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderColor: '#475569',
                    color: '#E2E8F0',
                  }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#94A3B8" 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="buyPoint" 
                  stroke="#10B981" 
                  strokeWidth={0} 
                  dot={{ r: 6, fill: '#10B981', stroke: '#064E3B', strokeWidth: 2 }} 
                  activeDot={{ r: 8 }} 
                  isAnimationActive={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sellPoint" 
                  stroke="#EF4444" 
                  strokeWidth={0} 
                  dot={{ r: 6, fill: '#EF4444', stroke: '#7F1D1D', strokeWidth: 2 }} 
                  activeDot={{ r: 8 }} 
                  isAnimationActive={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800 p-4 rounded-lg">
        <h4 className="font-medium mb-3">Trade History</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-2">Date</th>
                <th className="text-left py-2 px-2">Action</th>
                <th className="text-right py-2 px-2">Price</th>
                <th className="text-right py-2 px-2">Shares</th>
                <th className="text-right py-2 px-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {result.trades.map((trade, index) => (
                <tr 
                  key={index} 
                  className="border-b border-slate-700 last:border-none hover:bg-slate-700"
                >
                  <td className="py-2 px-2">{new Date(trade.date).toLocaleDateString()}</td>
                  <td className="py-2 px-2">
                    <span className={`inline-block px-2 py-1 rounded-md text-xs ${
                      trade.type === 'buy' ? 'bg-success-900 text-success-400' : 'bg-error-900 text-error-400'
                    }`}>
                      {trade.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right">{formatCurrency(trade.price)}</td>
                  <td className="py-2 px-2 text-right">{trade.shares}</td>
                  <td className="py-2 px-2 text-right">{formatCurrency(trade.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BacktestResults;
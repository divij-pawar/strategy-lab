import React, { useState } from 'react';
import { Play, ArrowRight, Download, Calendar, BarChart3, LineChart } from 'lucide-react';
import { mockBacktestResult, generateMockChartData } from '../../data/mockData';
import { BacktestResult, ChartData } from '../../types';
import StrategyBuilder from './StrategyBuilder';
import BacktestResults from './BacktestResults';

interface BacktestingPanelProps {
  symbol: string;
}

const BacktestingPanel: React.FC<BacktestingPanelProps> = ({ symbol }) => {
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2022-12-31');
  const [initialCapital, setInitialCapital] = useState(10000);
  const [selectedStrategy, setSelectedStrategy] = useState('moving_avg_crossover');
  const [backTestParams, setBackTestParams] = useState({
    fastPeriod: 20,
    slowPeriod: 50,
    rsiPeriod: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
  });
  const [backtestComplete, setBacktestComplete] = useState(false);
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null);
  const [historicalData, setHistoricalData] = useState<ChartData[]>([]);

  const strategies = [
    { id: 'moving_avg_crossover', name: 'Moving Average Crossover' },
    { id: 'rsi_strategy', name: 'RSI Overbought/Oversold' },
    { id: 'bollinger_breakout', name: 'Bollinger Band Breakout' },
    { id: 'macd_signal', name: 'MACD Signal Line Crossover' },
  ];

  const handleUpdateParam = (paramName: string, value: number) => {
    setBackTestParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleRunBacktest = () => {
    // In a real app, this would make an API call to perform backtesting
    // For demo purposes, we'll just use mock data and add a delay
    
    // Simulate loading
    setBacktestComplete(false);
    
    setTimeout(() => {
      // Generate mock historical data for chart
      const data = generateMockChartData(365);
      setHistoricalData(data);
      
      // Set mock result
      setBacktestResult({
        ...mockBacktestResult,
        strategyName: strategies.find(s => s.id === selectedStrategy)?.name || '',
        startDate,
        endDate,
        initialCapital,
      });
      
      setBacktestComplete(true);
    }, 1500);
  };

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <BarChart3 className="mr-2 text-primary-500" size={24} />
          Backtesting Dashboard
          <span className="ml-2 px-2 py-1 bg-slate-700 text-xs rounded">
            {symbol}
          </span>
        </h2>
        
        {backtestComplete && (
          <button className="px-3 py-1 bg-primary-700 hover:bg-primary-600 text-white rounded flex items-center transition-colors">
            <Download size={16} className="mr-1" />
            Export Results
          </button>
        )}
      </div>
      
      <div className="flex flex-grow overflow-hidden">
        <div className="w-80 bg-slate-900 p-4 rounded-lg mr-4 flex flex-col">
          <h3 className="font-semibold mb-4">Strategy Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Strategy</label>
              <select
                value={selectedStrategy}
                onChange={(e) => setSelectedStrategy(e.target.value)}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
              >
                {strategies.map(strategy => (
                  <option key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-sm text-slate-400 mb-1">
                  <Calendar size={14} className="inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-slate-400 mb-1">
                  <Calendar size={14} className="inline mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Initial Capital ($)
              </label>
              <input
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
              />
            </div>
            
            <StrategyBuilder
              strategy={selectedStrategy}
              params={backTestParams}
              onUpdateParam={handleUpdateParam}
            />
            
            <button
              onClick={handleRunBacktest}
              className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded flex items-center justify-center transition-colors"
            >
              <Play size={18} className="mr-2" />
              Run Backtest
            </button>
          </div>
        </div>
        
        <div className="flex-grow bg-slate-900 rounded-lg overflow-auto">
          {!backtestComplete ? (
            <div className="h-full flex items-center justify-center flex-col p-8">
              <LineChart size={48} className="text-slate-700 mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">
                Configure and Run Your Backtest
              </h3>
              <p className="text-slate-500 text-center max-w-md">
                Set up your trading strategy parameters, define your time period, and click "Run Backtest" to see how your strategy would have performed.
              </p>
              <div className="mt-6 flex items-center text-slate-600">
                <div className="px-3 py-1 border border-slate-700 rounded mr-2">1. Configure</div>
                <ArrowRight size={16} className="mr-2" />
                <div className="px-3 py-1 border border-slate-700 rounded mr-2">2. Run</div>
                <ArrowRight size={16} className="mr-2" />
                <div className="px-3 py-1 border border-slate-700 rounded">3. Analyze</div>
              </div>
            </div>
          ) : (
            <BacktestResults result={backtestResult!} historicalData={historicalData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BacktestingPanel;
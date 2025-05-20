import React from 'react';
import { LineChart, BarChart2, TrendingUp, BarChart, Settings } from 'lucide-react';
import { TimeframeOption } from '../../types';

interface ChartControlsProps {
  chartType: 'line' | 'candlestick' | 'area';
  onChartTypeChange: (type: 'line' | 'candlestick' | 'area') => void;
  showVolume: boolean;
  onToggleVolume: () => void;
  timeframe: string;
  timeframeOptions: TimeframeOption[];
  onTimeframeChange: (timeframe: string) => void;
  onToggleIndicators: () => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  chartType,
  onChartTypeChange,
  showVolume,
  onToggleVolume,
  timeframe,
  timeframeOptions,
  onTimeframeChange,
  onToggleIndicators,
}) => {
  return (
    <div className="p-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2">
      <div className="flex space-x-2">
        <div className="bg-slate-700 rounded flex p-1 h-9">
          <button
            className={`p-1 px-2 rounded flex items-center text-sm ${
              chartType === 'line' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-600'
            }`}
            onClick={() => onChartTypeChange('line')}
          >
            <LineChart size={16} className="mr-1" />
            <span>Line</span>
          </button>
          <button
            className={`p-1 px-2 rounded flex items-center text-sm ${
              chartType === 'candlestick' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-600'
            }`}
            onClick={() => onChartTypeChange('candlestick')}
          >
            <BarChart2 size={16} className="mr-1" />
            <span>Candle</span>
          </button>
          <button
            className={`p-1 px-2 rounded flex items-center text-sm ${
              chartType === 'area' ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-600'
            }`}
            onClick={() => onChartTypeChange('area')}
          >
            <TrendingUp size={16} className="mr-1" />
            <span>Area</span>
          </button>
        </div>
        
        <div className="bg-slate-700 rounded p-1 h-9">
          <button
            className={`p-1 px-2 rounded flex items-center text-sm ${
              showVolume ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-600'
            }`}
            onClick={onToggleVolume}
          >
            <BarChart size={16} className="mr-1" />
            <span>Volume</span>
          </button>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <div className="bg-slate-700 rounded flex p-1 h-9">
          {timeframeOptions.map(option => (
            <button
              key={option.id}
              className={`p-1 px-3 rounded text-sm ${
                timeframe === option.id ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => onTimeframeChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <button
          className="p-1 px-3 h-9 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded flex items-center text-sm transition-colors"
          onClick={onToggleIndicators}
        >
          <Settings size={16} className="mr-1" />
          <span>Indicators</span>
        </button>
      </div>
    </div>
  );
};

export default ChartControls;
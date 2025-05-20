import React from 'react';
import { Sliders } from 'lucide-react';

interface StrategyBuilderProps {
  strategy: string;
  params: {
    fastPeriod: number;
    slowPeriod: number;
    rsiPeriod: number;
    rsiOverbought: number;
    rsiOversold: number;
  };
  onUpdateParam: (paramName: string, value: number) => void;
}

const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ 
  strategy, 
  params, 
  onUpdateParam 
}) => {
  return (
    <div className="p-3 border border-slate-700 rounded-md">
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <Sliders size={16} className="mr-1 text-primary-400" />
        Strategy Parameters
      </h4>
      
      {strategy === 'moving_avg_crossover' && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Fast MA Period</label>
              <span>{params.fastPeriod}</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={params.fastPeriod}
              onChange={(e) => onUpdateParam('fastPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Slow MA Period</label>
              <span>{params.slowPeriod}</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              value={params.slowPeriod}
              onChange={(e) => onUpdateParam('slowPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
        </div>
      )}
      
      {strategy === 'rsi_strategy' && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>RSI Period</label>
              <span>{params.rsiPeriod}</span>
            </div>
            <input
              type="range"
              min="2"
              max="30"
              value={params.rsiPeriod}
              onChange={(e) => onUpdateParam('rsiPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Overbought Level</label>
              <span>{params.rsiOverbought}</span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              value={params.rsiOverbought}
              onChange={(e) => onUpdateParam('rsiOverbought', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Oversold Level</label>
              <span>{params.rsiOversold}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={params.rsiOversold}
              onChange={(e) => onUpdateParam('rsiOversold', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
        </div>
      )}
      
      {strategy === 'bollinger_breakout' && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Period</label>
              <span>{params.fastPeriod}</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={params.fastPeriod}
              onChange={(e) => onUpdateParam('fastPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Standard Deviations</label>
              <span>{params.slowPeriod / 10}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={params.slowPeriod}
              onChange={(e) => onUpdateParam('slowPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
        </div>
      )}
      
      {strategy === 'macd_signal' && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Fast Period</label>
              <span>{params.fastPeriod}</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={params.fastPeriod}
              onChange={(e) => onUpdateParam('fastPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Slow Period</label>
              <span>{params.slowPeriod}</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={params.slowPeriod}
              onChange={(e) => onUpdateParam('slowPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Signal Period</label>
              <span>{params.rsiPeriod}</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={params.rsiPeriod}
              onChange={(e) => onUpdateParam('rsiPeriod', Number(e.target.value))}
              className="w-full accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyBuilder;
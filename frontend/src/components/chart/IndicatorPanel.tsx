import React from 'react';
import { X } from 'lucide-react';
import { IndicatorOption } from '../../types';

interface IndicatorPanelProps {
  indicators: IndicatorOption[];
  activeIndicators: string[];
  onToggleIndicator: (id: string) => void;
  indicatorParams: Record<string, Record<string, number | string>>;
  onUpdateParam: (indicatorId: string, paramId: string, value: number | string) => void;
  onClose: () => void;
}

const IndicatorPanel: React.FC<IndicatorPanelProps> = ({
  indicators,
  activeIndicators,
  onToggleIndicator,
  indicatorParams,
  onUpdateParam,
  onClose
}) => {
  return (
    <div className="w-72 bg-slate-900 border-l border-slate-700 overflow-auto">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-semibold">Technical Indicators</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="p-4">
        {indicators.map(indicator => (
          <div key={indicator.id} className="mb-4 last:mb-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`indicator-${indicator.id}`}
                checked={activeIndicators.includes(indicator.id)}
                onChange={() => onToggleIndicator(indicator.id)}
                className="mr-2"
              />
              <label 
                htmlFor={`indicator-${indicator.id}`}
                className="font-medium cursor-pointer"
              >
                {indicator.name}
              </label>
            </div>
            
            <div className="mt-1 text-xs text-slate-400">
              {indicator.description}
            </div>
            
            {activeIndicators.includes(indicator.id) && (
              <div className="mt-2 pl-5 space-y-2">
                {indicator.parameters.map(param => (
                  <div key={param.id} className="flex flex-col">
                    <label className="text-sm text-slate-400 mb-1">
                      {param.name}
                    </label>
                    
                    {param.type === 'number' && (
                      <div className="flex items-center">
                        <input
                          type="range"
                          min={param.min || 1}
                          max={param.max || 100}
                          value={Number(indicatorParams[indicator.id][param.id] || param.default)}
                          onChange={(e) => onUpdateParam(indicator.id, param.id, Number(e.target.value))}
                          className="flex-grow mr-2 accent-primary-500 h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
                        />
                        <div className="w-10 text-center text-sm">
                          {indicatorParams[indicator.id][param.id] || param.default}
                        </div>
                      </div>
                    )}
                    
                    {param.type === 'select' && param.options && (
                      <select
                        value={indicatorParams[indicator.id][param.id] as string || param.default}
                        onChange={(e) => onUpdateParam(indicator.id, param.id, e.target.value)}
                        className="p-1 text-sm rounded bg-slate-800 border border-slate-700"
                      >
                        {param.options.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndicatorPanel;
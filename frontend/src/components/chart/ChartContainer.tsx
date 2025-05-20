import React, { useState } from 'react';
import { ChartData } from '../../types';
import { indicatorOptions, timeframeOptions } from '../../data/mockData';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Bar,
} from 'recharts';
import ChartControls from './ChartControls';
import IndicatorPanel from './IndicatorPanel';

interface ChartContainerProps {
  data: ChartData[];
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  data, 
  timeframe,
  onTimeframeChange,
}) => {
  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'area'>('line');
  const [showVolume, setShowVolume] = useState(true);
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['sma']);
  const [indicatorParams, setIndicatorParams] = useState<Record<string, Record<string, number | string>>>({
    sma: { period: 20 },
    ema: { period: 20 },
    bb: { period: 20, stdDev: 2 },
    rsi: { period: 14 },
    macd: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
  });
  const [showIndicatorPanel, setShowIndicatorPanel] = useState(false);

  // Calculate SMA for demonstration purposes
  const calculateSMA = (data: ChartData[], period: number) => {
    return data.map((point, index) => {
      if (index < period - 1) return { ...point, sma: null };
      
      let sum = 0;
      for (let i = 0; i < period; i++) {
        sum += data[index - i].close;
      }
      return { ...point, sma: sum / period };
    });
  };

  // Apply indicators to data
  const dataWithIndicators = React.useMemo(() => {
    let processedData = [...data];
    
    // Add SMA if active
    if (activeIndicators.includes('sma')) {
      const period = Number(indicatorParams.sma.period);
      processedData = calculateSMA(processedData, period);
    }
    
    // For demo purposes, we'll simulate other indicators
    if (activeIndicators.includes('ema')) {
      processedData = processedData.map((point, index) => {
        // Simplified EMA calculation for demo
        const ema = point.close * 0.95 + (index > 0 ? (processedData[index - 1].ema || point.close) * 0.05 : point.close);
        return { ...point, ema };
      });
    }
    
    if (activeIndicators.includes('bb')) {
      const period = Number(indicatorParams.bb.period);
      const stdDev = Number(indicatorParams.bb.stdDev);
      
      // Calculate SMA first
      const dataWithSMA = calculateSMA(processedData, period);
      
      // Add Bollinger Bands
      processedData = dataWithSMA.map((point, index) => {
        if (index < period - 1) return { ...point, upperBB: null, lowerBB: null };
        
        // Calculate standard deviation (simplified)
        let sum = 0;
        for (let i = 0; i < period; i++) {
          sum += Math.pow(data[index - i].close - (point.sma || 0), 2);
        }
        const std = Math.sqrt(sum / period);
        
        return { 
          ...point, 
          upperBB: (point.sma || 0) + stdDev * std,
          lowerBB: (point.sma || 0) - stdDev * std,
        };
      });
    }
    
    return processedData;
  }, [data, activeIndicators, indicatorParams]);

  const toggleIndicator = (indicatorId: string) => {
    setActiveIndicators(prev => 
      prev.includes(indicatorId) 
        ? prev.filter(id => id !== indicatorId)
        : [...prev, indicatorId]
    );
  };

  const updateIndicatorParam = (indicatorId: string, paramId: string, value: number | string) => {
    setIndicatorParams(prev => ({
      ...prev,
      [indicatorId]: {
        ...prev[indicatorId],
        [paramId]: value,
      }
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <ChartControls 
        chartType={chartType}
        onChartTypeChange={setChartType}
        showVolume={showVolume}
        onToggleVolume={() => setShowVolume(!showVolume)}
        timeframe={timeframe}
        timeframeOptions={timeframeOptions}
        onTimeframeChange={onTimeframeChange}
        onToggleIndicators={() => setShowIndicatorPanel(!showIndicatorPanel)}
      />
      
      <div className="flex-grow flex relative p-4">
        <div className="flex-grow h-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataWithIndicators}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#94A3B8' }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
                tickFormatter={(value) => {
                  if (timeframe === '1d') return value.split(' ')[1];
                  return value.split('-').slice(1).join('/');
                }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fill: '#94A3B8' }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
                yAxisId="price"
              />
              {showVolume && (
                <YAxis
                  orientation="right"
                  yAxisId="volume"
                  domain={['auto', 'auto']}
                  tick={{ fill: '#94A3B8' }}
                  axisLine={{ stroke: '#475569' }}
                  tickLine={{ stroke: '#475569' }}
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  borderColor: '#475569',
                  color: '#E2E8F0',
                }}
                labelStyle={{ color: '#94A3B8' }}
              />
              <Legend />
              
              {/* Main price line */}
              {chartType === 'line' && (
                <Line
                  type="monotone"
                  dataKey="close"
                  name="Price"
                  stroke="#3B82F6"
                  dot={false}
                  strokeWidth={2}
                  yAxisId="price"
                />
              )}
              
              {/* Area chart */}
              {chartType === 'area' && (
                <Area
                  type="monotone"
                  dataKey="close"
                  name="Price"
                  stroke="#3B82F6"
                  fill="url(#colorClose)"
                  fillOpacity={0.3}
                  yAxisId="price"
                />
              )}
              
              {/* Volume chart */}
              {showVolume && (
                <Bar
                  dataKey="volume"
                  name="Volume"
                  fill="#64748B"
                  opacity={0.5}
                  yAxisId="volume"
                />
              )}
              
              {/* Technical indicators */}
              {activeIndicators.includes('sma') && (
                <Line
                  type="monotone"
                  dataKey="sma"
                  name={`SMA (${indicatorParams.sma.period})`}
                  stroke="#F59E0B"
                  dot={false}
                  strokeWidth={1.5}
                  yAxisId="price"
                />
              )}
              
              {activeIndicators.includes('ema') && (
                <Line
                  type="monotone"
                  dataKey="ema"
                  name={`EMA (${indicatorParams.ema.period})`}
                  stroke="#10B981"
                  dot={false}
                  strokeWidth={1.5}
                  yAxisId="price"
                />
              )}
              
              {activeIndicators.includes('bb') && (
                <>
                  <Line
                    type="monotone"
                    dataKey="upperBB"
                    name="Upper Bollinger"
                    stroke="#EF4444"
                    dot={false}
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    yAxisId="price"
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBB"
                    name="Lower Bollinger"
                    stroke="#EF4444"
                    dot={false}
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    yAxisId="price"
                  />
                </>
              )}
              
              {/* Gradient for area chart */}
              <defs>
                <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {showIndicatorPanel && (
          <IndicatorPanel
            indicators={indicatorOptions}
            activeIndicators={activeIndicators}
            onToggleIndicator={toggleIndicator}
            indicatorParams={indicatorParams}
            onUpdateParam={updateIndicatorParam}
            onClose={() => setShowIndicatorPanel(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ChartContainer;
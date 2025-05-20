import { StockData, ChartData, BacktestResult, IndicatorOption, WatchlistItem, TimeframeOption } from '../types';
import { format, subDays } from 'date-fns';

// Mock stock data
export const mockStockData: StockData = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 173.25,
  change: 2.35,
  changePercent: 1.38,
  open: 171.22,
  high: 173.89,
  low: 170.98,
  close: 173.25,
  volume: 67912400,
  marketCap: 2860000000000,
  peRatio: 28.57,
  dividend: 0.92,
  yield: 0.53,
  eps: 6.07,
};

// Mock watch list
export const mockWatchlist: WatchlistItem[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 173.25,
    change: 2.35,
    changePercent: 1.38,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 352.60,
    change: -1.15,
    changePercent: -0.32,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 155.21,
    change: 3.45,
    changePercent: 2.27,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 142.87,
    change: 1.12,
    changePercent: 0.79,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 196.72,
    change: -5.43,
    changePercent: -2.68,
  },
];

// Generate mock chart data
export const generateMockChartData = (days: number): ChartData[] => {
  const data: ChartData[] = [];
  let price = 150;
  
  for (let i = days; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const change = (Math.random() - 0.5) * 5;
    price += change;
    
    const open = price - (Math.random() * 2);
    const close = price;
    const high = Math.max(open, close) + (Math.random() * 2);
    const low = Math.min(open, close) - (Math.random() * 2);
    const volume = Math.floor(Math.random() * 10000000) + 5000000;
    
    data.push({
      date,
      open,
      high,
      low,
      close,
      volume,
    });
  }
  
  return data;
};

// Mock backtesting result
export const mockBacktestResult: BacktestResult = {
  strategyName: 'Moving Average Crossover',
  startDate: '2022-01-01',
  endDate: '2022-12-31',
  initialCapital: 10000,
  finalCapital: 12450,
  totalReturn: 24.5,
  annualizedReturn: 24.5,
  maxDrawdown: 8.3,
  sharpeRatio: 1.75,
  trades: [
    { date: '2022-01-15', type: 'buy', price: 165.23, shares: 60, value: 9913.8 },
    { date: '2022-03-10', type: 'sell', price: 158.52, shares: 60, value: 9511.2 },
    { date: '2022-04-05', type: 'buy', price: 172.14, shares: 55, value: 9467.7 },
    { date: '2022-07-20', type: 'sell', price: 186.35, shares: 55, value: 10249.25 },
    { date: '2022-08-12', type: 'buy', price: 177.23, shares: 57, value: 10102.11 },
    { date: '2022-11-28', type: 'sell', price: 218.42, shares: 57, value: 12450 },
  ],
  equity: Array.from({ length: 12 }, (_, i) => ({
    date: format(new Date(2022, i, 15), 'yyyy-MM-dd'),
    equity: 10000 + (i * 245),
  })),
};

// Technical indicators options
export const indicatorOptions: IndicatorOption[] = [
  {
    id: 'sma',
    name: 'Simple Moving Average',
    description: 'Average price over a specified number of periods',
    parameters: [
      {
        id: 'period',
        name: 'Period',
        type: 'number',
        default: 20,
        min: 2,
        max: 200,
      },
    ],
    defaultVisible: true,
  },
  {
    id: 'ema',
    name: 'Exponential Moving Average',
    description: 'Weighted average with more focus on recent prices',
    parameters: [
      {
        id: 'period',
        name: 'Period',
        type: 'number',
        default: 20,
        min: 2,
        max: 200,
      },
    ],
    defaultVisible: false,
  },
  {
    id: 'bb',
    name: 'Bollinger Bands',
    description: 'Volatility bands placed above and below a moving average',
    parameters: [
      {
        id: 'period',
        name: 'Period',
        type: 'number',
        default: 20,
        min: 2,
        max: 100,
      },
      {
        id: 'stdDev',
        name: 'Standard Deviations',
        type: 'number',
        default: 2,
        min: 1,
        max: 4,
      },
    ],
    defaultVisible: false,
  },
  {
    id: 'rsi',
    name: 'Relative Strength Index',
    description: 'Momentum oscillator measuring speed and change of price movements',
    parameters: [
      {
        id: 'period',
        name: 'Period',
        type: 'number',
        default: 14,
        min: 2,
        max: 50,
      },
    ],
    defaultVisible: false,
  },
  {
    id: 'macd',
    name: 'MACD',
    description: 'Trend-following momentum indicator showing relationship between two moving averages',
    parameters: [
      {
        id: 'fastPeriod',
        name: 'Fast Period',
        type: 'number',
        default: 12,
        min: 2,
        max: 50,
      },
      {
        id: 'slowPeriod',
        name: 'Slow Period',
        type: 'number',
        default: 26,
        min: 2,
        max: 100,
      },
      {
        id: 'signalPeriod',
        name: 'Signal Period',
        type: 'number',
        default: 9,
        min: 2,
        max: 50,
      },
    ],
    defaultVisible: false,
  },
];

// Timeframe options
export const timeframeOptions: TimeframeOption[] = [
  { id: '1d', label: '1D', days: 1 },
  { id: '1w', label: '1W', days: 7 },
  { id: '1m', label: '1M', days: 30 },
  { id: '3m', label: '3M', days: 90 },
  { id: '1y', label: '1Y', days: 365 },
  { id: '5y', label: '5Y', days: 365 * 5 },
];
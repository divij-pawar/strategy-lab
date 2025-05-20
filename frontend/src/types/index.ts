export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  dividend?: number;
  yield?: number;
  eps?: number;
}

export interface ChartData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IndicatorOption {
  id: string;
  name: string;
  description: string;
  parameters: IndicatorParameter[];
  defaultVisible: boolean;
}

export interface IndicatorParameter {
  id: string;
  name: string;
  type: 'number' | 'select';
  default: number | string;
  min?: number;
  max?: number;
  options?: string[];
}

export interface BacktestResult {
  strategyName: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalCapital: number;
  totalReturn: number;
  annualizedReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: BacktestTrade[];
  equity: EquityPoint[];
}

export interface BacktestTrade {
  date: string;
  type: 'buy' | 'sell';
  price: number;
  shares: number;
  value: number;
}

export interface EquityPoint {
  date: string;
  equity: number;
}

export interface TimeframeOption {
  id: string;
  label: string;
  days: number;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export type ChartType = 'line' | 'candlestick' | 'area';
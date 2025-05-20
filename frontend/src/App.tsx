import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChartContainer from './components/chart/ChartContainer';
import StockInfo from './components/StockInfo';
import BacktestingPanel from './components/backtesting/BacktestingPanel';
import Footer from './components/Footer';
import SettingsMenu from './components/SettingsMenu';

// Types
import { StockData, ChartData } from './types';

// Data
import { mockStockData, generateMockChartData } from './data/mockData';

function App() {
  const [selectedStock, setSelectedStock] = useState<StockData>(mockStockData);
  const [chartData, setChartData] = useState<ChartData[]>(generateMockChartData(180));
  const [activeTab, setActiveTab] = useState<'chart' | 'backtest'>('chart');
  const [timeframe, setTimeframe] = useState<string>('3m');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Handle changing timeframe
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    const days = (() => {
      switch (newTimeframe) {
        case '1d': return 1;
        case '1w': return 7;
        case '1m': return 30;
        case '3m': return 90;
        case '1y': return 365;
        case '5y': return 365 * 5;
        default: return 90;
      }
    })();
    setChartData(generateMockChartData(days));
  };

  // Handle stock selection
  const handleStockSelect = (symbol: string) => {
    // In a real app, this would fetch data for the selected stock
    console.log(`Selected stock: ${symbol}`);
    // For now, we'll just use the mock data
    setSelectedStock({...mockStockData, symbol});
    setChartData(generateMockChartData(timeframe === '3m' ? 90 : 30));
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenSettings={() => setShowSettings(true)}
      />
      
      <div className="flex flex-grow overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onStockSelect={handleStockSelect}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isDarkMode={isDarkMode}
          onOpenSettings={() => setShowSettings(true)}
        />
        
        <main className={`flex-1 flex flex-col overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
          <div className={`p-4 flex items-center border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex items-center">
              <LayoutDashboard className="mr-2 text-primary-400" size={20} />
              <h1 className="text-xl font-semibold">{selectedStock.name} ({selectedStock.symbol})</h1>
            </div>
            
            <div className="ml-auto flex gap-2">
              <button 
                className={`px-4 py-2 rounded ${activeTab === 'chart' 
                  ? 'bg-primary-600 text-white' 
                  : isDarkMode 
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                onClick={() => setActiveTab('chart')}
              >
                Chart Analysis
              </button>
              <button 
                className={`px-4 py-2 rounded ${activeTab === 'backtest' 
                  ? 'bg-primary-600 text-white' 
                  : isDarkMode 
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                onClick={() => setActiveTab('backtest')}
              >
                Backtesting
              </button>
            </div>
          </div>
          
          <div className="flex flex-grow overflow-hidden">
            <div className="flex-grow overflow-auto">
              {activeTab === 'chart' ? (
                <div className="h-full flex flex-col">
                  <StockInfo stock={selectedStock} isDarkMode={isDarkMode} />
                  <ChartContainer 
                    data={chartData} 
                    timeframe={timeframe}
                    onTimeframeChange={handleTimeframeChange}
                    isDarkMode={isDarkMode}
                  />
                </div>
              ) : (
                <BacktestingPanel symbol={selectedStock.symbol} isDarkMode={isDarkMode} />
              )}
            </div>
          </div>
        </main>
      </div>
      
      <Footer isDarkMode={isDarkMode} />
      
      <SettingsMenu
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
    </div>
  );
}

export default App;
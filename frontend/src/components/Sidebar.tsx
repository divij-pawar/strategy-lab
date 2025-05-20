import React from 'react';
import { TrendingUp, ChevronLeft, ChevronRight, Star, PlusCircle, Settings, LineChart } from 'lucide-react';
import { mockWatchlist } from '../data/mockData';
import { WatchlistItem } from '../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onStockSelect: (symbol: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse, onStockSelect }) => {
  return (
    <aside className={`bg-slate-900 border-r border-slate-700 transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        {!collapsed && <h2 className="text-lg font-semibold">Watchlist</h2>}
        <button 
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {mockWatchlist.map((item) => (
          <WatchlistRow 
            key={item.symbol} 
            item={item} 
            collapsed={collapsed} 
            onSelect={() => onStockSelect(item.symbol)}
          />
        ))}
        
        <button className={`w-full p-4 flex ${collapsed ? 'justify-center' : 'justify-start'} items-center text-primary-400 hover:bg-slate-800 transition-colors`}>
          <PlusCircle size={18} />
          {!collapsed && <span className="ml-2">Add Symbol</span>}
        </button>
      </div>
      
      <div className="p-4 border-t border-slate-700">
        <div className={`flex ${collapsed ? 'justify-center' : 'justify-start'} mb-2`}>
          {collapsed ? (
            <LineChart size={20} className="text-slate-400" />
          ) : (
            <div className="text-sm text-slate-400">Market Indices</div>
          )}
        </div>
        
        {!collapsed && (
          <>
            <div className="flex justify-between items-center mb-2">
              <div>S&P 500</div>
              <div className="text-success-500">+1.23%</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div>NASDAQ</div>
              <div className="text-success-500">+1.56%</div>
            </div>
            <div className="flex justify-between items-center">
              <div>DOW</div>
              <div className="text-error-500">-0.32%</div>
            </div>
          </>
        )}
        
        <button className={`mt-4 w-full p-2 flex ${collapsed ? 'justify-center' : 'justify-start'} items-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors`}>
          <Settings size={18} />
          {!collapsed && <span className="ml-2">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

interface WatchlistRowProps {
  item: WatchlistItem;
  collapsed: boolean;
  onSelect: () => void;
}

const WatchlistRow: React.FC<WatchlistRowProps> = ({ item, collapsed, onSelect }) => {
  return (
    <div 
      className="p-4 hover:bg-slate-800 cursor-pointer transition-colors flex items-center justify-between"
      onClick={onSelect}
    >
      <div className="flex items-center min-w-0">
        <TrendingUp 
          size={18} 
          className={item.change >= 0 ? 'text-success-500' : 'text-error-500'} 
        />
        
        {!collapsed && (
          <div className="ml-2 truncate">
            <div className="font-medium">{item.symbol}</div>
            <div className="text-xs text-slate-400 truncate">{item.name}</div>
          </div>
        )}
      </div>
      
      {!collapsed && (
        <div className={`text-right ${item.change >= 0 ? 'text-success-500' : 'text-error-500'}`}>
          ${item.price.toFixed(2)}
          <div className="text-xs">
            {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
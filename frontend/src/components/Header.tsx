import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Sun, Moon, Settings, LogOut, UserCircle, Mail, Bell as BellIcon } from 'lucide-react';
import { mockWatchlist } from '../data/mockData';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => setShowResults(true);
  const handleSearchBlur = () => setTimeout(() => setShowResults(false), 200);

  const filteredResults = mockWatchlist.filter(
    item => item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const notifications = [
    { id: 1, title: 'Price Alert', message: 'AAPL has reached your target price of $175', time: '5m ago', unread: true },
    { id: 2, title: 'System Update', message: 'New features available in the latest update', time: '1h ago', unread: true },
    { id: 3, title: 'Market News', message: 'Major market movement detected in tech sector', time: '2h ago', unread: false },
  ];

  return (
    <header className={`flex items-center justify-between px-6 py-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border-b`}>
      <div className="flex items-center">
        <div className="mr-4 flex items-center text-xl font-bold">
          <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Strategy</span>
          <span className="text-primary-500">Lab</span>
        </div>
        
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search symbols..."
              className={`py-2 pl-10 pr-4 w-64 rounded-md border transition-all ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 focus:border-primary-500' 
                  : 'bg-slate-100 border-slate-200 focus:border-primary-400'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          </div>
          
          {showResults && (
            <div className={`absolute top-full left-0 mt-1 w-64 border rounded-md shadow-lg z-10 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}>
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <div
                    key={result.symbol}
                    className={`px-4 py-2 cursor-pointer ${
                      isDarkMode 
                        ? 'hover:bg-slate-700' 
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-medium">{result.symbol}</div>
                    <div className="text-xs text-slate-400">{result.name}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-slate-400">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode 
              ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full relative transition-colors ${
              isDarkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 border rounded-lg shadow-lg z-20 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}>
              <div className="p-4 border-b border-slate-700">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b last:border-b-0 ${
                      isDarkMode 
                        ? 'border-slate-700 hover:bg-slate-700' 
                        : 'border-slate-200 hover:bg-slate-50'
                    } ${notification.unread ? 'bg-opacity-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-slate-400">{notification.message}</p>
                        <span className="text-xs text-slate-500">{notification.time}</span>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-slate-700">
                <button className="text-primary-500 hover:text-primary-400 text-sm">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center cursor-pointer"
          >
            <div className={`rounded-full p-2 ${
              isDarkMode ? 'bg-primary-700' : 'bg-primary-100'
            }`}>
              <User size={20} className={isDarkMode ? 'text-white' : 'text-primary-700'} />
            </div>
          </button>
          
          {showUserMenu && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg z-20 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}>
              <div className="p-3 border-b border-slate-700">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-slate-400">john@example.com</p>
              </div>
              
              <div className="py-1">
                <button className={`w-full px-4 py-2 text-left flex items-center ${
                  isDarkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-slate-100'
                }`}>
                  <UserCircle size={16} className="mr-2" />
                  Profile
                </button>
                <button className={`w-full px-4 py-2 text-left flex items-center ${
                  isDarkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-slate-100'
                }`}>
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
                <button className={`w-full px-4 py-2 text-left flex items-center ${
                  isDarkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-slate-100'
                }`}>
                  <Mail size={16} className="mr-2" />
                  Messages
                </button>
              </div>
              
              <div className="border-t border-slate-700 py-1">
                <button className={`w-full px-4 py-2 text-left flex items-center text-error-500 ${
                  isDarkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-slate-100'
                }`}>
                  <LogOut size={16} className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
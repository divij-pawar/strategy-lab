import React from 'react';
import { X, Monitor, Moon, Sun, Bell, Lock, Eye, Palette, Globe, Database } from 'lucide-react';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-lg shadow-xl ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className={`sticky top-0 flex items-center justify-between p-4 border-b ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Appearance */}
          <div>
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Palette size={20} className="mr-3 text-primary-500" />
                  <div>
                    <div className="font-medium">Theme</div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Choose your preferred theme
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={onToggleTheme}
                    className={`p-2 rounded-lg flex items-center ${
                      !isDarkMode 
                        ? 'bg-primary-100 text-primary-900' 
                        : isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                    }`}
                  >
                    <Sun size={18} className="mr-2" />
                    Light
                  </button>
                  <button
                    onClick={onToggleTheme}
                    className={`p-2 rounded-lg flex items-center ${
                      isDarkMode 
                        ? 'bg-primary-900 text-primary-100' 
                        : isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                    }`}
                  >
                    <Moon size={18} className="mr-2" />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-medium mb-4">Notifications</h3>
            <div className={`space-y-4 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={20} className="mr-3 text-primary-500" />
                  <div>
                    <div className="font-medium">Price Alerts</div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Get notified about price movements
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe size={20} className="mr-3 text-primary-500" />
                  <div>
                    <div className="font-medium">Market News</div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Receive market updates and news
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Preferences */}
          <div>
            <h3 className="text-lg font-medium mb-4">Data Preferences</h3>
            <div className={`space-y-4 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database size={20} className="mr-3 text-primary-500" />
                  <div>
                    <div className="font-medium">Data Update Frequency</div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      How often to refresh market data
                    </div>
                  </div>
                </div>
                <select className={`px-3 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-white border-slate-300'
                }`}>
                  <option value="realtime">Real-time</option>
                  <option value="1min">Every minute</option>
                  <option value="5min">Every 5 minutes</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye size={20} className="mr-3 text-primary-500" />
                  <div>
                    <div className="font-medium">Default Chart Type</div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Choose default chart visualization
                    </div>
                  </div>
                </div>
                <select className={`px-3 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-white border-slate-300'
                }`}>
                  <option value="candlestick">Candlestick</option>
                  <option value="line">Line</option>
                  <option value="area">Area</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-lg font-medium mb-4">Security</h3>
            <div className={`space-y-4 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock size={20} className="mr-3 text-primary-500" />
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Add an extra layer of security
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={`sticky bottom-0 flex justify-end gap-3 p-4 border-t ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600' 
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
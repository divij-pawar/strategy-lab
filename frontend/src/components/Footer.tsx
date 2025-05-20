import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`py-4 px-6 border-t ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-700 text-slate-400' 
        : 'bg-white border-slate-200 text-slate-600'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-sm">
            © 2024 StrategyLab. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-primary-500 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm hover:text-primary-500 transition-colors">Contact Us</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-800 hover:text-white' 
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Github size={20} />
          </a>
          <a 
            href="#" 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-800 hover:text-white' 
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Twitter size={20} />
          </a>
          <a 
            href="#" 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-800 hover:text-white' 
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
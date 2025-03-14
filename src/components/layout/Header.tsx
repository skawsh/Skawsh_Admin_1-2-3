
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  toggleSidebar?: () => void;
  className?: string;
}

const Header = ({ toggleSidebar, className }: HeaderProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className={cn("w-full h-16 border-b border-gray-200 bg-white flex items-center px-4 lg:px-6 animate-fade-in", className)}>
      <button 
        onClick={toggleSidebar}
        className="lg:hidden mr-4 text-gray-500 hover:text-gray-700"
      >
        <Menu size={24} />
      </button>
      
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue focus:border-transparent bg-gray-50 placeholder-gray-400 transition-all"
        />
      </div>
      
      <div className="flex items-center ml-auto">
        <div className="relative mr-4">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-gray-600">Today: {formattedDate}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

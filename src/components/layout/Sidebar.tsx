
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Car,
  Package,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  className?: string; // Added className as an optional prop
}

const Sidebar = ({ collapsed, className }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Drivers',
      path: '/drivers',
      icon: Car,
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: Package,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 h-full transition-all duration-300',
      collapsed ? 'w-[80px]' : 'w-[280px]',
      className // Added className to the className string
    )}>
      <div className="flex flex-col h-full">
        <div className="p-6">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={cn(
              'transition-all duration-300',
              collapsed ? 'w-8' : 'w-32'
            )} 
          />
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'w-full flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors',
                    isActive(item.path) && 'bg-blue-50 text-blue-600'
                  )}
                >
                  <item.icon className={cn(
                    'flex-shrink-0',
                    collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'
                  )} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;


import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  Truck, 
  ClipboardList, 
  BarChart2, 
  DollarSign, 
  Users, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  // In a real app, this would be dynamic based on the current route
  const activePage = 'orders';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'studios', label: 'Studios', icon: Store },
    { id: 'services', label: 'Services', icon: ShoppingBag },
    { id: 'drivers', label: 'Drivers', icon: Truck },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, hasChildren: true },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={cn("w-[250px] h-screen border-r border-gray-200 flex flex-col py-4 animate-fade-in", className)}>
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold text-laundry-blue">Laundry Link</h1>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <a 
            key={item.id}
            href="#" 
            className={cn(
              "nav-item group",
              activePage === item.id && "active"
            )}
          >
            <item.icon size={20} className="flex-shrink-0" />
            <span>{item.label}</span>
            {item.hasChildren && (
              <span className="ml-auto transform transition-transform">›</span>
            )}
          </a>
        ))}
      </nav>
      
      <div className="px-4 mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-laundry-blue text-white flex items-center justify-center font-medium">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Admin User</span>
            <span className="text-xs text-gray-500">admin@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

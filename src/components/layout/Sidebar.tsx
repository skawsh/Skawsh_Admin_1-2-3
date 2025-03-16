
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
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  // Get the current route to highlight active links
  const currentPath = location.pathname;
  
  // Get activePage based on current path
  const getActivePage = () => {
    if (currentPath.includes('/drivers')) return 'drivers';
    if (currentPath === '/') return 'orders';
    return '';
  };
  
  const activePage = getActivePage();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'studios', label: 'Studios', icon: Store, path: '/studios' },
    { id: 'services', label: 'Services', icon: ShoppingBag, path: '/services' },
    { id: 'drivers', label: 'Drivers', icon: Truck, path: '/drivers' },
    { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, hasChildren: true, path: '/analytics' },
    { id: 'revenue', label: 'Revenue', icon: DollarSign, path: '/revenue' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className={cn("w-[250px] h-screen border-r border-gray-200 flex flex-col py-4 animate-fade-in", className)}>
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold text-laundry-blue">Laundry Link</h1>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.id}
            to={item.path}
            className={cn(
              "nav-item group flex items-center text-sm text-gray-700 rounded-md px-3 py-2 hover:bg-gray-100",
              activePage === item.id && "active bg-blue-50 text-laundry-blue font-medium"
            )}
          >
            <item.icon size={20} className="flex-shrink-0 mr-3" />
            <span>{item.label}</span>
            {item.hasChildren && (
              <span className="ml-auto transform transition-transform">›</span>
            )}
          </Link>
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

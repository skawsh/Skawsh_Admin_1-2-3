
import React from 'react';
import { cn } from '@/lib/utils';
import { BarChart2, DollarSign, Package, Truck, Check, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface OrderMetricsCardProps {
  title: string;
  value: string | number;
  icon: 'orders' | 'delivered' | 'collected' | 'revenue' | 'average' | 'progress' | 'ready' | 'cancelled' | 'assigned';
  className?: string;
}

const OrderMetricsCard = ({ 
  title, 
  value, 
  icon, 
  className 
}: OrderMetricsCardProps) => {
  
  const getIcon = () => {
    switch (icon) {
      case 'orders':
        return <Package size={24} className="text-indigo-500" />;
      case 'delivered':
        return <Truck size={24} className="text-green-500" />;
      case 'collected':
        return <Check size={24} className="text-blue-500" />;
      case 'progress':
        return <Package size={24} className="text-orange-500" />;
      case 'ready':
        return <Check size={24} className="text-yellow-500" />;
      case 'revenue':
        return <DollarSign size={24} className="text-emerald-500" />;
      case 'average':
        return <BarChart2 size={24} className="text-purple-500" />;
      case 'cancelled':
        return <AlertTriangle size={24} className="text-red-500" />;
      case 'assigned':
        return <CheckCircle2 size={24} className="text-teal-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className={cn(
      "metrics-card bg-white border border-gray-100 rounded-lg shadow-sm p-5 h-28 flex flex-col justify-between animate-slide-up",
      className
    )}>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 font-medium text-sm">{title}</span>
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
          {getIcon()}
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      </div>
    </div>
  );
};

export default OrderMetricsCard;

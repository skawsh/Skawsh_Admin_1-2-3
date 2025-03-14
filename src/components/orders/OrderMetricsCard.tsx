
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
        return <Package size={20} className="text-indigo-500" />;
      case 'delivered':
        return <Truck size={20} className="text-green-500" />;
      case 'collected':
        return <Check size={20} className="text-blue-500" />;
      case 'progress':
        return <Package size={20} className="text-orange-500" />;
      case 'ready':
        return <Check size={20} className="text-yellow-500" />;
      case 'revenue':
        return <DollarSign size={20} className="text-emerald-500" />;
      case 'average':
        return <BarChart2 size={20} className="text-purple-500" />;
      case 'cancelled':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'assigned':
        return <CheckCircle2 size={20} className="text-teal-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className={cn("metrics-card animate-slide-up", className)}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-500 font-medium text-sm">{title}</span>
        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-50">
          {getIcon()}
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};

export default OrderMetricsCard;

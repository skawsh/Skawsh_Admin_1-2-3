
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
  
  const getIconAndColor = () => {
    switch (icon) {
      case 'orders':
        return {
          icon: <Package size={24} className="text-white" />,
          bgColor: "bg-indigo-500",
          gradientBg: "bg-gradient-card-indigo",
          shadow: "shadow-purple-glow"
        };
      case 'delivered':
        return {
          icon: <Truck size={24} className="text-white" />,
          bgColor: "bg-green-500",
          gradientBg: "bg-gradient-card-green",
          shadow: "shadow-green-glow"
        };
      case 'collected':
        return {
          icon: <Check size={24} className="text-white" />,
          bgColor: "bg-blue-500",
          gradientBg: "bg-gradient-card-blue",
          shadow: "shadow-blue-glow"
        };
      case 'progress':
        return {
          icon: <Package size={24} className="text-white" />,
          bgColor: "bg-orange-500",
          gradientBg: "bg-gradient-card-orange",
          shadow: "shadow-md"
        };
      case 'ready':
        return {
          icon: <Check size={24} className="text-white" />,
          bgColor: "bg-yellow-500",
          gradientBg: "bg-gradient-card-yellow",
          shadow: "shadow-md"
        };
      case 'revenue':
        return {
          icon: <DollarSign size={24} className="text-white" />,
          bgColor: "bg-emerald-500",
          gradientBg: "bg-gradient-card-green",
          shadow: "shadow-green-glow"
        };
      case 'average':
        return {
          icon: <BarChart2 size={24} className="text-white" />,
          bgColor: "bg-purple-500",
          gradientBg: "bg-gradient-card-purple",
          shadow: "shadow-purple-glow"
        };
      case 'cancelled':
        return {
          icon: <AlertTriangle size={24} className="text-white" />,
          bgColor: "bg-red-500",
          gradientBg: "bg-gradient-card-red",
          shadow: "shadow-md"
        };
      case 'assigned':
        return {
          icon: <CheckCircle2 size={24} className="text-white" />,
          bgColor: "bg-teal-500",
          gradientBg: "bg-gradient-card-cyan",
          shadow: "shadow-md"
        };
      default:
        return {
          icon: null,
          bgColor: "bg-gray-500",
          gradientBg: "bg-white",
          shadow: "shadow-md"
        };
    }
  };
  
  const { icon: iconElement, bgColor, gradientBg, shadow } = getIconAndColor();
  
  return (
    <div className={cn(
      "rounded-lg shadow-md border border-gray-100 p-5 h-28 transition-all duration-300",
      gradientBg,
      shadow,
      "hover:shadow-lg hover:translate-y-[-2px]",
      "animate-slide-up",
      className
    )}>
      <div className="flex justify-between items-start">
        <span className="text-gray-700 font-medium text-sm">{title}</span>
        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shadow-sm", bgColor)}>
          {iconElement}
        </div>
      </div>
      
      <div className="flex flex-col mt-2">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      </div>
    </div>
  );
};

export default OrderMetricsCard;

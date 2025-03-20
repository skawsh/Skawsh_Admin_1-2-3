
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Truck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DriverMetricsCardProps {
  title: string;
  value: string;
  icon: 'drivers' | 'active' | 'inactive';
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

const DriverMetricsCard = ({ 
  title, 
  value, 
  icon,
  trend,
  className 
}: DriverMetricsCardProps) => {
  const getIconAndTheme = () => {
    switch (icon) {
      case 'drivers':
        return {
          icon: <Users className="h-8 w-8 text-white" />,
          bgColor: "bg-laundry-blue",
          gradientBg: "bg-gradient-card-blue",
          shadow: "shadow-blue-glow"
        };
      case 'active':
        return {
          icon: <Truck className="h-8 w-8 text-white" />,
          bgColor: "bg-green-500",
          gradientBg: "bg-gradient-card-green",
          shadow: "shadow-green-glow"
        };
      case 'inactive':
        return {
          icon: <Clock className="h-8 w-8 text-white" />,
          bgColor: "bg-gray-500",
          gradientBg: "bg-gradient-card-purple",
          shadow: "shadow-purple-glow"
        };
      default:
        return {
          icon: <Users className="h-8 w-8 text-white" />,
          bgColor: "bg-laundry-blue",
          gradientBg: "bg-white",
          shadow: "shadow-md"
        };
    }
  };

  const { icon: iconElement, bgColor, gradientBg, shadow } = getIconAndTheme();

  return (
    <Card className={cn(
      "border border-gray-100 overflow-hidden transition-all duration-300",
      gradientBg,
      shadow,
      "hover:shadow-lg hover:translate-y-[-2px]",
      className
    )}>
      <CardContent className="flex p-6">
        <div className="flex flex-col flex-1">
          <span className="text-gray-700 text-sm font-medium mb-1">{title}</span>
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          {trend && (
            <div className="mt-2 flex items-center">
              <span className={cn(
                "text-xs font-medium",
                trend.value > 0 ? "text-green-600" : "text-red-600"
              )}>
                {trend.value > 0 ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">{trend.label}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-14 h-14">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", bgColor)}>
            {iconElement}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverMetricsCard;

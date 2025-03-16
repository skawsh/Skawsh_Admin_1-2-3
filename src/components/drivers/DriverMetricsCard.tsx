
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
  const getIcon = () => {
    switch (icon) {
      case 'drivers':
        return <Users className="h-8 w-8 text-laundry-blue" />;
      case 'active':
        return <Truck className="h-8 w-8 text-green-500" />;
      case 'inactive':
        return <Clock className="h-8 w-8 text-gray-500" />;
      default:
        return <Users className="h-8 w-8 text-laundry-blue" />;
    }
  };

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardContent className="flex pt-6">
        <div className="flex flex-col flex-1">
          <span className="text-gray-500 text-sm font-medium mb-1">{title}</span>
          <span className="text-3xl font-bold">{value}</span>
        </div>
        <div className="flex items-center justify-center w-14">
          {getIcon()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverMetricsCard;

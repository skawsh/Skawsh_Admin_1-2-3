
import React from 'react';
import { MapPin, Truck, Calendar, User, Building, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface OrderCardProps {
  id: string;
  orderId: string;
  date: string;
  status: string;
  customer: string;
  customerAddress: string;
  studio: string;
  studioAddress: string;
  onViewDetails?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  date,
  status,
  customer,
  customerAddress,
  studio,
  studioAddress,
  onViewDetails
}) => {
  // Determine pickup and delivery information based on order status
  const isReadyForCollection = status === 'ready-for-collect';
  
  const pickupInfo = {
    location: isReadyForCollection ? studio : customer,
    address: isReadyForCollection ? studioAddress : customerAddress,
    icon: isReadyForCollection ? <Building className="text-gray-600" size={16} /> : <User className="text-gray-600" size={16} />
  };
  
  const deliveryInfo = {
    location: isReadyForCollection ? customer : studio,
    address: isReadyForCollection ? customerAddress : studioAddress,
    icon: isReadyForCollection ? <User className="text-gray-600" size={16} /> : <Building className="text-gray-600" size={16} />
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-blue-600">{orderId}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {date}
          </div>
        </div>
        <div>
          {status && <StatusBadge status={status as any} />}
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        {/* Pickup Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            <span className="font-semibold text-gray-800">Pickup</span>
          </div>
          <div className="ml-6 space-y-1">
            <div className="flex items-center gap-1 text-sm">
              {pickupInfo.icon}
              <span className="font-medium">{pickupInfo.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={14} className="text-gray-400 opacity-70" />
              <span>{pickupInfo.address}</span>
            </div>
          </div>
        </div>
        
        {/* Delivery Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-green-500" />
            <span className="font-semibold text-gray-800">Delivery</span>
          </div>
          <div className="ml-6 space-y-1">
            <div className="flex items-center gap-1 text-sm">
              {deliveryInfo.icon}
              <span className="font-medium">{deliveryInfo.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={14} className="text-gray-400 opacity-70" />
              <span>{deliveryInfo.address}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onViewDetails}
        >
          <Eye size={16} />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;

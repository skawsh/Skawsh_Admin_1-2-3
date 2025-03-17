
import React, { useState } from 'react';
import { MapPin, Truck, Calendar, User, Building, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  pickedUp?: boolean;
  pickedUpTime?: string | null;
  dropped?: boolean;
  droppedTime?: string | null;
  showNewOrder?: boolean;
  isDriverOrdersView?: boolean; // New prop to indicate if displayed in driver orders view
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  date,
  status,
  customer,
  customerAddress,
  studio,
  studioAddress,
  onViewDetails,
  pickedUp,
  pickedUpTime,
  dropped,
  droppedTime,
  showNewOrder,
  isDriverOrdersView = false // Default to false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Determine pickup and delivery information based on order status
  const isReadyForCollection = status === 'ready-for-collect';
  const isNewOrder = status === 'new';
  
  const pickupInfo = {
    location: isReadyForCollection ? studio : customer,
    address: isReadyForCollection ? studioAddress : customerAddress,
    icon: isReadyForCollection ? <Building className="text-gray-600" size={16} /> : <User className="text-gray-600" size={16} />,
    label: isReadyForCollection ? "Collect" : "Pickup"
  };
  
  const deliveryInfo = {
    location: isReadyForCollection ? customer : studio,
    address: isReadyForCollection ? customerAddress : studioAddress,
    icon: isReadyForCollection ? <User className="text-gray-600" size={16} /> : <Building className="text-gray-600" size={16} />,
    label: isNewOrder ? "Drop" : "Delivery"
  };

  return (
    <>
      <Card className="w-full max-w-sm overflow-hidden border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div>
            <h3 className="text-lg font-medium text-blue-600">{orderId}</h3>
          </div>
          <div>
            {status && <StatusBadge 
              status={status as any} 
              pickedUp={pickedUp}
              pickedUpTime={pickedUpTime}
              dropped={dropped}
              droppedTime={droppedTime}
              showNewOrder={showNewOrder}
              isDriverOrdersView={isDriverOrdersView}
            />}
          </div>
        </div>
        
        <CardContent className="p-4 space-y-4">
          {/* Pickup Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-red-500" />
              <span className="font-semibold text-gray-800">{pickupInfo.label}</span>
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
              <span className="font-semibold text-gray-800">{deliveryInfo.label}</span>
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
            onClick={() => setShowDetails(true)}
          >
            <Eye size={16} />
            Trip Details
          </Button>
        </CardFooter>
      </Card>

      {/* Trip Details Dialog - Updated to match the design in the image */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader className="space-y-1 pb-2">
            <DialogTitle className="text-xl font-semibold">Order Details</DialogTitle>
            <div className="text-base font-medium text-gray-600">
              {orderId}
            </div>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            {/* Order Status Section */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">Status:</span>
              {orderId === 'ORD-R001' ? (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                  Ready for pickup
                </span>
              ) : pickedUp && pickedUpTime ? (
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm font-medium">
                  Picked up: {pickedUpTime}
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                  Ready for pickup
                </span>
              )}
            </div>
            
            {/* Pickup Details */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold flex items-center gap-2">
                <MapPin size={18} className="text-red-500" />
                Pickup Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">
                    {orderId === 'ORD-R001' ? 'Sanjay Mehta' : pickupInfo.location}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-right text-gray-900 max-w-[230px]">
                    {orderId === 'ORD-R001' ? '27, Film Nagar, Hyderabad' : pickupInfo.address}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Drop Details */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold flex items-center gap-2">
                <Truck size={18} className="text-green-500" />
                Drop Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">
                    {orderId === 'ORD-R001' ? 'Laundry Express' : deliveryInfo.location}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-right text-gray-900 max-w-[230px]">
                    {orderId === 'ORD-R001' 
                      ? 'Laundry Express, Road No. 12, Banjara Hills' 
                      : deliveryInfo.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderCard;

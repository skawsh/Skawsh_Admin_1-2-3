
import React from 'react';
import { MapPin, Truck, User, Building, Eye } from 'lucide-react';
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
  const [showDetails, setShowDetails] = React.useState(false);
  
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

  // Mock data for pickup and drop timestamps
  const getStatusTimestamp = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  return (
    <>
      <Card className="w-full max-w-sm overflow-hidden border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div>
            <h3 className="text-lg font-medium text-blue-600">{orderId}</h3>
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

      {/* Trip Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <div className="text-sm text-blue-600 mt-1">{orderId}</div>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Status Section */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={status as any} />
                
                {/* Status timestamps - these would come from real data in a production app */}
                {status === 'ready-for-collect' && (
                  <span className="text-xs text-gray-500">Ready for pickup</span>
                )}
                {status === 'in-progress' && (
                  <span className="text-xs text-gray-500">Picked Up: {getStatusTimestamp()}</span>
                )}
                {status === 'delivered' && (
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">Picked Up: {getStatusTimestamp()}</span>
                    <span className="text-xs text-gray-500">Dropped: {getStatusTimestamp()}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Pickup Details */}
            <div className="space-y-2 border-t pt-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                {pickupInfo.label} Details
              </h4>
              <div className="ml-6 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{pickupInfo.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span className="text-right max-w-[200px]">{pickupInfo.address}</span>
                </div>
              </div>
            </div>
            
            {/* Delivery Details */}
            <div className="space-y-2 border-t pt-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Truck size={16} className="text-green-500" />
                {deliveryInfo.label} Details
              </h4>
              <div className="ml-6 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{deliveryInfo.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span className="text-right max-w-[200px]">{deliveryInfo.address}</span>
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

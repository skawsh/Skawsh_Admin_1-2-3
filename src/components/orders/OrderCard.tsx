
import React, { useState } from 'react';
import { MapPin, Truck, Calendar, User, Building, Eye, Clock, Package, PackageCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDateString, formatDateTime } from './utils/dateUtils';

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
  isDriverOrdersView?: boolean; // Prop to indicate if displayed in driver orders view
  showOriginalStatus?: boolean; // New prop to force showing the original status
  showTripStatus?: boolean; // New prop to show special trip status for ORD-0004
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
  isDriverOrdersView = false,
  showOriginalStatus = false,
  showTripStatus = false // Default to false
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

  // Define pickup/drop labels based on order status for trip tracking
  const pickupLabel = isReadyForCollection ? "Collected" : "Picked Up";
  const dropLabel = isReadyForCollection ? "Delivered" : "Dropped Off";

  // Override time displays and labels based on order ID
  const customPickupTime = determinePickupTime(orderId, pickedUpTime);
  const customDropTime = determineDropTime(orderId, droppedTime);

  // Override pickup/drop status based on order ID for custom orders
  const customPickedUp = determinePickedUpStatus(orderId, pickedUp);
  const customDropped = determineDroppedStatus(orderId, dropped);
  
  // Special handling for ORD-0004
  const isORD0004 = orderId === 'ORD-0004';

  function determinePickupTime(orderId: string, defaultTime: string | null | undefined): string | null | undefined {
    switch (orderId) {
      case 'ORD-0011':
      case 'ORD-R001':
        return "06:40 on 17/03/2025";
      case 'ORD-0012':
      case 'ORD-R002':
        return "12:40 on 17/03/2025";
      default:
        return defaultTime;
    }
  }
  function determineDropTime(orderId: string, defaultTime: string | null | undefined): string | null | undefined {
    switch (orderId) {
      case 'ORD-R001':
        return "07:40 on 17/03/2025";
      case 'ORD-R002':
        return "01:20 on 17/03/2025";
      default:
        return defaultTime;
    }
  }
  function determinePickedUpStatus(orderId: string, defaultStatus: boolean | undefined): boolean {
    switch (orderId) {
      case 'ORD-0011':
      case 'ORD-R001':
      case 'ORD-0012':
      case 'ORD-R002':
        return true;
      default:
        return defaultStatus || false;
    }
  }
  function determineDroppedStatus(orderId: string, defaultStatus: boolean | undefined): boolean {
    switch (orderId) {
      case 'ORD-R001':
      case 'ORD-R002':
        return true;
      default:
        return defaultStatus || false;
    }
  }
  
  return <>
      <Card className="w-full max-w-sm overflow-hidden border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div>
            <h3 className="text-lg font-medium text-blue-600">{orderId}</h3>
          </div>
          <div>
            {status && <StatusBadge status={status as any} pickedUp={customPickedUp} pickedUpTime={customPickupTime} dropped={customDropped} droppedTime={customDropTime} showNewOrder={showNewOrder} isDriverOrdersView={isDriverOrdersView} showOriginalStatus={showOriginalStatus} />}
          </div>
        </div>
        
        <CardContent className="p-4 space-y-4">
          {/* Trip Status Indicator - Only for ORD-0004 */}
          {(showTripStatus || isORD0004) && (
            <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between mb-2">
              <span>Trip Status:</span>
              <span className="font-semibold">Pickup In Progress</span>
            </div>
          )}
          
          {/* Pickup Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-red-500" />
              <span className="font-semibold text-gray-800">{pickupInfo.label}</span>
            </div>
            <div className="ml-6 space-y-1">
              
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
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setShowDetails(true)}>
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
            {/* Order Status Section - Now using the same logic for showing status */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">Status:</span>
              {showOriginalStatus ? <StatusBadge status={status as any} showOriginalStatus={true} /> : orderId === 'ORD-R001' ? <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                  Ready for pickup
                </span> : customPickedUp && customPickupTime ? <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm font-medium">
                  {isReadyForCollection ? 'Collected' : 'Picked up'}: {customPickupTime}
                </span> : <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                  Ready for {isReadyForCollection ? 'collection' : 'pickup'}
                </span>}
            </div>
            
            {/* Trip Status Indicator - Only for ORD-0004 */}
            {(showTripStatus || isORD0004) && (
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">Trip Status:</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium">
                  Pickup In Progress
                </span>
              </div>
            )}
            
            {/* Pickup Details */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold flex items-center gap-2">
                <MapPin size={18} className="text-red-500" />
                {isReadyForCollection ? "Collection" : "Pickup"} Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">
                    {orderId === 'ORD-R001' ? 'Sanjay Mehta' : orderId === 'ORD-R002' ? 'UClean' : pickupInfo.location}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-right text-gray-900 max-w-[230px]">
                    {orderId === 'ORD-R001' ? '27, Film Nagar, Hyderabad' : orderId === 'ORD-R002' ? 'UClean, KPHB Colony, Kukatpally' : pickupInfo.address}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Drop Details */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold flex items-center gap-2">
                <Truck size={18} className="text-green-500" />
                {isReadyForCollection ? "Delivery" : "Drop"} Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">
                    {orderId === 'ORD-R001' ? 'Laundry Express' : orderId === 'ORD-R002' ? 'Deepika Reddy' : deliveryInfo.location}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-right text-gray-900 max-w-[230px]">
                    {orderId === 'ORD-R001' ? 'Laundry Express, Road No. 12, Banjara Hills' : orderId === 'ORD-R002' ? '72, Kukatpally, Hyderabad' : deliveryInfo.address}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Trip Tracking Timeline - Updated with order ID-specific conditions */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-base font-semibold flex items-center gap-2">
                <Clock size={18} className="text-blue-500" />
                Trip Tracking
              </h4>
              <div className="space-y-4">
                {/* Order Created */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Calendar size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Order Created</div>
                    <div className="text-xs text-gray-500">{date}</div>
                  </div>
                </div>
                
                {/* Pickup Status - Custom displays based on order ID */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {determinePickedUpIcon(orderId, customPickedUp)}
                  </div>
                  <div>
                    <div className={`font-medium text-sm ${customPickedUp ? 'text-green-700' : 'text-gray-500'}`}>
                      {getPickupStatusLabel(orderId, customPickedUp, customPickupTime, pickupLabel, isReadyForCollection)}
                    </div>
                    {!['ORD-0004', 'ORD-0011', 'ORD-R001', 'ORD-0003', 'ORD-0012', 'ORD-R002'].includes(orderId) && customPickedUp && customPickupTime ? <div className="text-xs text-gray-500">{customPickupTime}</div> : !['ORD-0004', 'ORD-0011', 'ORD-R001', 'ORD-0003', 'ORD-0012', 'ORD-R002'].includes(orderId) ? <div className="text-xs text-gray-400">Pending</div> : null}
                  </div>
                </div>
                
                {/* Delivery Status - Custom displays based on order ID */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {determineDroppedIcon(orderId, customDropped)}
                  </div>
                  <div>
                    <div className={`font-medium text-sm ${customDropped ? 'text-green-700' : 'text-gray-500'}`}>
                      {getDropStatusLabel(orderId, customDropped, customDropTime, dropLabel, isReadyForCollection)}
                    </div>
                    {!['ORD-0004', 'ORD-R001', 'ORD-0003', 'ORD-R002'].includes(orderId) && customDropped && customDropTime ? <div className="text-xs text-gray-500">{customDropTime}</div> : !['ORD-0004', 'ORD-R001', 'ORD-0003', 'ORD-R002'].includes(orderId) ? <div className="text-xs text-gray-400">Pending</div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};

// Helper function to determine which icon to display for pickup status
function determinePickedUpIcon(orderId: string, pickedUp: boolean) {
  if (['ORD-0011', 'ORD-R001', 'ORD-0012', 'ORD-R002'].includes(orderId)) {
    return <CheckCircle2 size={16} className="text-green-500" />;
  } else {
    return <Package size={16} className={`${pickedUp ? 'text-green-500' : 'text-gray-400'}`} />;
  }
}

// Helper function to determine which icon to display for drop status
function determineDroppedIcon(orderId: string, dropped: boolean) {
  if (['ORD-R001', 'ORD-R002'].includes(orderId)) {
    return <CheckCircle2 size={16} className="text-green-500" />;
  } else {
    return <PackageCheck size={16} className={`${dropped ? 'text-green-500' : 'text-gray-400'}`} />;
  }
}

// Helper function to get pickup status label
function getPickupStatusLabel(orderId: string, pickedUp: boolean, pickupTime: string | null | undefined, pickupLabel: string, isReadyForCollection: boolean) {
  if (orderId === 'ORD-0004') {
    return `${pickupLabel} Pending`;
  } else if (orderId === 'ORD-0003') {
    return `Collection pending`;
  } else if (orderId === 'ORD-0011') {
    return `✅ ${pickupLabel} at ${pickupTime}`;
  } else if (orderId === 'ORD-R001') {
    return `✅ ${pickupLabel} at ${pickupTime}`;
  } else if (orderId === 'ORD-0012') {
    return `✅ Collected at ${pickupTime}`;
  } else if (orderId === 'ORD-R002') {
    return `✅ Collected at ${pickupTime}`;
  } else if (pickedUp && pickupTime) {
    return `✅ ${pickupLabel} at ${pickupTime}`;
  } else {
    return `${isReadyForCollection ? 'Collection' : pickupLabel} Pending`;
  }
}

// Helper function to get drop status label
function getDropStatusLabel(orderId: string, dropped: boolean, dropTime: string | null | undefined, dropLabel: string, isReadyForCollection: boolean) {
  if (orderId === 'ORD-0004') {
    return `${dropLabel} Pending`;
  } else if (orderId === 'ORD-0003') {
    return `Delivery pending`;
  } else if (orderId === 'ORD-R001') {
    return `✅ ${dropLabel} at ${dropTime}`;
  } else if (orderId === 'ORD-R002') {
    return `✅ Delivered at ${dropTime}`;
  } else if (dropped && dropTime) {
    return `✅ ${dropLabel} at ${dropTime}`;
  } else {
    return `${isReadyForCollection ? 'Delivery' : dropLabel} Pending`;
  }
}
export default OrderCard;

import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '../StatusBadge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import TripStatusIndicator from './TripStatusIndicator';
import WashTypeBadge from './WashTypeBadge';
import LocationInfo from './LocationInfo';
import TripDetailsDialog from './TripDetailsDialog';
import { determinePickedUpStatus, determinePickupTime, determineDroppedStatus } from './orderUtils';
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
  isDriverOrdersView?: boolean;
  showOriginalStatus?: boolean;
  showTripStatus?: boolean;
  washType?: string;
  reported?: boolean;
  reportedIssue?: string;
  reportedDescription?: string;
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
  showTripStatus = false,
  washType = 'standard',
  reported = false,
  reportedIssue = 'Customer Not Responding',
  reportedDescription = ''
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Determine pickup and delivery information based on order status
  const isReadyForCollection = status === 'ready-for-collect';
  const isNewOrder = status === 'new';

  // Special handling for ORD-0004
  const isORD0004 = orderId === 'ORD-0004';

  // Override pickup/drop status based on order ID for custom orders
  const customPickedUp = determinePickedUpStatus(orderId, pickedUp);
  const customPickupTime = determinePickupTime(orderId, pickedUpTime);

  // Pickup location info
  const pickupInfo = {
    location: isReadyForCollection ? studio : customer,
    address: isReadyForCollection ? studioAddress : customerAddress
  };

  // Delivery location info
  const deliveryInfo = {
    location: isReadyForCollection ? customer : studio,
    address: isReadyForCollection ? customerAddress : studioAddress
  };
  return <>
      <Card className="w-full max-w-sm overflow-hidden border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div>
            <h3 className="text-lg font-medium text-blue-600">{orderId}</h3>
          </div>
          <div>
            {status && <StatusBadge status={status as any} pickedUp={customPickedUp} pickedUpTime={customPickupTime} dropped={dropped} droppedTime={droppedTime} showNewOrder={showNewOrder} isDriverOrdersView={isDriverOrdersView} showOriginalStatus={showOriginalStatus} />}
          </div>
        </div>
        
        <CardContent className="p-4 space-y-4">
          {/* Trip Status Indicator */}
          <TripStatusIndicator show={showTripStatus || isORD0004} />
          
          {/* Wash Type Badge */}
          <div className="flex items-center gap-2">
            <WashTypeBadge washType={washType} />
          </div>
          
          {/* Pickup Information */}
          <LocationInfo type="pickup" location={pickupInfo.location} address={pickupInfo.address} isReadyForCollection={isReadyForCollection} isNewOrder={isNewOrder} />
          
          {/* Delivery Information */}
          <LocationInfo type="delivery" location={deliveryInfo.location} address={deliveryInfo.address} isReadyForCollection={isReadyForCollection} isNewOrder={isNewOrder} />
        </CardContent>
        
        <div className="flex items-center justify-between border-t border-gray-100 p-4">
          <div>
            <span className="text-sm font-bold text-gray-800">Trip Details</span>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setShowDetails(true)}>
            <Eye size={16} />
            View
          </Button>
        </div>
      </Card>

      {/* Trip Details Dialog */}
      <TripDetailsDialog open={showDetails} onOpenChange={setShowDetails} orderId={orderId} date={date} status={status} customer={customer} customerAddress={customerAddress} studio={studio} studioAddress={studioAddress} pickedUp={pickedUp} pickedUpTime={pickedUpTime} dropped={dropped} droppedTime={droppedTime} isReadyForCollection={isReadyForCollection} showOriginalStatus={showOriginalStatus} washType={washType} reported={reported} reportedIssue={reportedIssue} reportedDescription={reportedDescription} />
    </>;
};
export default OrderCard;
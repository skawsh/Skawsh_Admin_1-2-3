
import React from 'react';
import { Clock, Truck, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StatusBadge from '../StatusBadge';
import WashTypeBadge from './WashTypeBadge';
import TripTimeline from './TripTimeline';

interface TripDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  date: string;
  status: string;
  customer: string;
  customerAddress: string;
  studio: string;
  studioAddress: string;
  pickedUp?: boolean;
  pickedUpTime?: string | null;
  dropped?: boolean;
  droppedTime?: string | null;
  isReadyForCollection: boolean;
  showOriginalStatus?: boolean;
  washType?: string;
  reported?: boolean;
  reportedIssue?: string;
  reportedDescription?: string;
}

const TripDetailsDialog: React.FC<TripDetailsDialogProps> = ({
  open,
  onOpenChange,
  orderId,
  date,
  status,
  customer,
  customerAddress,
  studio,
  studioAddress,
  pickedUp,
  pickedUpTime,
  dropped,
  droppedTime,
  isReadyForCollection,
  showOriginalStatus = false,
  washType = 'standard',
  reported = false,
  reportedIssue = 'Customer Not Responding',
  reportedDescription = ''
}) => {
  // Override pickup/drop status based on order ID for custom orders
  const customPickedUp = determinePickedUpStatus(orderId, pickedUp);
  const customPickupTime = determinePickupTime(orderId, pickedUpTime);
  const isORD0004 = orderId === 'ORD-0004';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            {showOriginalStatus ? 
              <StatusBadge status={status as any} showOriginalStatus={true} /> : 
              orderId === 'ORD-R001' ? 
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                  Ready for pickup
                </span> : 
                customPickedUp && customPickupTime ? 
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm font-medium">
                    {isReadyForCollection ? 'Collected' : 'Picked up'}: {customPickupTime}
                  </span> : 
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                    Ready for {isReadyForCollection ? 'collection' : 'pickup'}
                  </span>
            }
          </div>
          
          {/* Reported Issue Banner - Only for reported orders */}
          {reported && (
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">Issue:</span>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">
                {reportedIssue || "Customer Not Responding"}
              </span>
            </div>
          )}
          
          {/* Trip Status Indicator - Only for ORD-0004 */}
          {isORD0004 && (
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">Trip Status:</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
                <Truck size={14} className="text-blue-600" />
                Pickup In Progress
              </span>
            </div>
          )}
          
          {/* Wash Type */}
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Wash Type:</span>
            <WashTypeBadge washType={washType} detailView={true} />
          </div>
          
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
                  {orderId === 'ORD-R001' ? 'Sanjay Mehta' : orderId === 'ORD-R002' ? 'UClean' : 
                   isReadyForCollection ? studio : customer}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-right text-gray-900 max-w-[230px]">
                  {orderId === 'ORD-R001' ? '27, Film Nagar, Hyderabad' : orderId === 'ORD-R002' ? 'UClean, KPHB Colony, Kukatpally' : 
                   isReadyForCollection ? studioAddress : customerAddress}
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
                  {orderId === 'ORD-R001' ? 'Laundry Express' : orderId === 'ORD-R002' ? 'Deepika Reddy' : 
                   isReadyForCollection ? customer : studio}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-right text-gray-900 max-w-[230px]">
                  {orderId === 'ORD-R001' ? 'Laundry Express, Road No. 12, Banjara Hills' : orderId === 'ORD-R002' ? '72, Kukatpally, Hyderabad' : 
                   isReadyForCollection ? customerAddress : studioAddress}
                </span>
              </div>
            </div>
          </div>
          
          {/* Trip Tracking Timeline */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="text-base font-semibold flex items-center gap-2">
              <Clock size={18} className="text-blue-500" />
              Trip Tracking
            </h4>
            <TripTimeline 
              orderId={orderId}
              date={date}
              pickedUp={pickedUp}
              pickedUpTime={pickedUpTime}
              dropped={dropped}
              droppedTime={droppedTime}
              isReadyForCollection={isReadyForCollection}
              reported={reported}
              reportedIssue={reportedIssue}
              reportedDescription={reportedDescription}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper functions for order-specific data
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

export default TripDetailsDialog;

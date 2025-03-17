
import React from 'react';
import { Calendar, Package, PackageCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

interface TripTimelineProps {
  orderId: string;
  date: string;
  pickedUp?: boolean;
  pickedUpTime?: string | null;
  dropped?: boolean;
  droppedTime?: string | null;
  isReadyForCollection: boolean;
  reported?: boolean;
  reportedIssue?: string;
  reportedDescription?: string;
}

const TripTimeline: React.FC<TripTimelineProps> = ({
  orderId,
  date,
  pickedUp,
  pickedUpTime,
  dropped,
  droppedTime,
  isReadyForCollection,
  reported,
  reportedIssue,
  reportedDescription
}) => {
  // Override pickup/drop status based on order ID for custom orders
  const customPickedUp = determinePickedUpStatus(orderId, pickedUp);
  const customDropped = determineDroppedStatus(orderId, dropped);
  
  // Override time displays and labels based on order ID
  const customPickupTime = determinePickupTime(orderId, pickedUpTime);
  const customDropTime = determineDropTime(orderId, droppedTime);
  
  // Define pickup/drop labels based on order status for trip tracking
  const pickupLabel = isReadyForCollection ? "Collected" : "Picked Up";
  const dropLabel = isReadyForCollection ? "Delivered" : "Dropped Off";
  
  return (
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
      
      {/* Pickup Status */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {determinePickedUpIcon(orderId, customPickedUp)}
        </div>
        <div>
          <div className={`font-medium text-sm ${customPickedUp ? 'text-green-700' : 'text-gray-500'}`}>
            {reported ? 
              `Pick up pending` : 
              getPickupStatusLabel(orderId, customPickedUp, customPickupTime, pickupLabel, isReadyForCollection)}
          </div>
          {!['ORD-0004', 'ORD-0011', 'ORD-R001', 'ORD-0003', 'ORD-0012', 'ORD-R002'].includes(orderId) && customPickedUp && customPickupTime ? 
            <div className="text-xs text-gray-500">{customPickupTime}</div> : 
            !['ORD-0004', 'ORD-0011', 'ORD-R001', 'ORD-0003', 'ORD-0012', 'ORD-R002'].includes(orderId) ? 
              <div className="text-xs text-gray-400">Pending</div> : null}
        </div>
      </div>
      
      {/* Delivery Status */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {determineDroppedIcon(orderId, customDropped)}
        </div>
        <div>
          <div className={`font-medium text-sm ${customDropped ? 'text-green-700' : 'text-gray-500'}`}>
            {getDropStatusLabel(orderId, customDropped, customDropTime, dropLabel, isReadyForCollection)}
          </div>
          {!['ORD-0004', 'ORD-R001', 'ORD-0003', 'ORD-R002'].includes(orderId) && customDropped && customDropTime ? 
            <div className="text-xs text-gray-500">{customDropTime}</div> : 
            !['ORD-0004', 'ORD-R001', 'ORD-0003', 'ORD-R002'].includes(orderId) ? 
              <div className="text-xs text-gray-400">Pending</div> : null}
        </div>
      </div>
      
      {/* Reported Issue - Only shown for reported orders */}
      {reported && (
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <div>
            <div className="font-medium text-sm text-red-700">
              Reported Issue: {reportedIssue || "Customer Not Responding"}
            </div>
            {reportedDescription && (
              <div className="text-xs text-gray-500">
                {reportedDescription}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
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

export default TripTimeline;

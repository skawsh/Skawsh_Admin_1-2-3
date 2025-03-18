
import React from 'react';
import { OrderStatus } from './types';
import './OrdersBadge.css';

interface StatusBadgeProps {
  status: OrderStatus | string;
  pickedUp?: boolean;
  pickedUpTime?: string | null;
  dropped?: boolean;
  droppedTime?: string | null;
  showNewOrder?: boolean; // Prop to control when to show "New Order"
  isDriverOrdersView?: boolean; // Prop to indicate if displayed in driver orders view
  showOriginalStatus?: boolean; // New prop to force showing the original status
  isRescheduledTab?: boolean; // New prop to indicate if displayed in the rescheduled tab
}

const StatusBadge = ({ 
  status, 
  pickedUp, 
  pickedUpTime, 
  dropped, 
  droppedTime,
  showNewOrder = false,
  isDriverOrdersView = false, // Default to false
  showOriginalStatus = false, // Default to false
  isRescheduledTab = false, // Default to false
}: StatusBadgeProps) => {
  // Special case for ORD-0005, always show "New Order"
  if (showOriginalStatus && status === "new") {
    return <span className="status-badge status-new">New Order</span>;
  }
  
  // If showOriginalStatus is true, skip the special cases and display the actual status
  if (showOriginalStatus) {
    // Make sure we handle all possible status values and provide appropriate display text
    switch (status) {
      case "new":
        return <span className="status-badge status-new">New Order</span>;
      case "received":
        return <span className="status-badge status-received">Order Received</span>;
      case "in-progress":
        return <span className="status-badge status-in-progress">In Progress</span>;
      case "ready-for-collect":
        return <span className="status-badge status-ready">Ready for collection</span>;
      case "delivered":
        return <span className="status-badge status-delivered">Order Delivered</span>;
      case "cancelled":
        return <span className="status-badge status-cancelled">Order cancelled</span>;
      case "completed":
        return <span className="status-badge status-delivered">Completed</span>;
      default:
        return <span className="status-badge status-new">New Order</span>;
    }
  }
  
  // Special cases for specific order IDs
  if ((status === "new" || status === "ready-for-collect") && pickedUp && !dropped) {
    const statusLabel = status === "ready-for-collect" ? "Collected" : "Picked up";
    return <span className="status-badge status-in-progress">{statusLabel}</span>;
  }
  
  // For new orders, show "New Order" if showNewOrder is true
  if (status === "new" && showNewOrder) {
    return <span className="status-badge status-new">New Order</span>;
  }
  
  // If in driver orders view and status is "new" or "ready-for-collect", 
  // always show "Ready for collection" to match the design in the image
  if (isDriverOrdersView && (status === "new" || status === "ready-for-collect")) {
    return <span className="status-badge status-ready">Ready for collection</span>;
  }
  
  // If in rescheduled tab and status is "ready-for-collect", always show "Ready for collection"
  // This is the key fix - show "Ready for collection" only for "ready-for-collect" status orders,
  // while respecting the original status for "new" orders
  if (isRescheduledTab && status === "ready-for-collect") {
    return <span className="status-badge status-ready">Ready for collection</span>;
  }
  
  // For orders, show the real-time status based on pickup and drop status
  if (status === "new" || status === "ready-for-collect") {
    const pickupLabel = status === "ready-for-collect" ? "Collected" : "Picked up";
    const dropLabel = status === "ready-for-collect" ? "Delivered" : "Dropped";
    
    if (dropped && droppedTime) {
      return <span className="status-badge status-delivered">{dropLabel}: {droppedTime}</span>;
    } else if (pickedUp && pickedUpTime) {
      return <span className="status-badge status-in-progress">{pickupLabel}</span>;
    } else {
      return <span className="status-badge status-ready">
        Ready for {status === "ready-for-collect" ? "collection" : "pickup"}
      </span>;
    }
  }

  // Standard status handling for all other cases
  switch (status) {
    case "new":
      return <span className="status-badge status-new">New Order</span>;
    case "received":
      return <span className="status-badge status-received">Order Received</span>;
    case "in-progress":
      return <span className="status-badge status-in-progress">In Progress</span>;
    case "ready-for-collect":
      return <span className="status-badge status-ready">Ready for collection</span>;
    case "delivered":
      return <span className="status-badge status-delivered">Order Delivered</span>;
    case "cancelled":
      return <span className="status-badge status-cancelled">Order cancelled</span>;
    case "completed":
      return <span className="status-badge status-delivered">Completed</span>;
    default:
      // Use a type assertion to handle cases where status might be passed as string from legacy code
      console.warn(`Unknown order status: ${status}`);
      return <span className="status-badge status-new">New Order</span>; // Default to New Order for unknown status
  }
};

export default StatusBadge;

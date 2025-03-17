
import React from 'react';
import OrderCard from '@/components/orders/OrderCard';
import { OrderStatus } from '@/components/orders/types';
import { AssignedOrder } from '@/types/order';

interface OrdersListProps {
  orders: AssignedOrder[];
  emptyMessage: string;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, emptyMessage }) => {
  const getSimplifiedStatus = (status: string | undefined): OrderStatus | undefined => {
    switch(status) {
      case 'Ready for Collection':
        return 'ready-for-collect';
      case 'In Progress':
        return 'in-progress';
      case 'New':
        return 'new';
      case 'Delivered':
        return 'delivered';
      case 'Collected':
        return 'delivered';
      case 'Pending':
        return 'received';
      default:
        return status as OrderStatus | undefined;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            orderId={order.orderId || ""}
            date={order.date || ""}
            status={order.originalStatus || getSimplifiedStatus(order.status) || "new"}
            customer={order.customer || ""}
            customerAddress={order.customerAddress || ""}
            studio={order.studio || ""}
            studioAddress={order.studioAddress || ""}
            pickedUp={order.pickedUp}
            pickedUpTime={order.pickedUpTime}
            dropped={order.dropped}
            droppedTime={order.droppedTime}
            isDriverOrdersView={true}
            showOriginalStatus={true}
            showTripStatus={order.showTripStatus}
            washType={order.washType}
          />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 col-span-3">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default OrdersList;

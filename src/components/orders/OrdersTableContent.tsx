
import React from 'react';
import OrderTableRow from './OrderTableRow';
import { Order } from './types';

interface OrdersTableContentProps {
  filteredOrders: Order[];
  formatDate: (dateString: string | null) => string;
  formatCurrency: (amount: number) => string;
  onViewDetails: (orderId: string) => void;
}

const OrdersTableContent = ({ 
  filteredOrders, 
  formatDate, 
  formatCurrency, 
  onViewDetails 
}: OrdersTableContentProps) => {
  return (
    <div className="relative overflow-x-auto mt-4 border border-gray-100 rounded-lg">
      <table className="w-full text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th className="table-head">S.No</th>
            <th className="table-head">Order ID</th>
            <th className="table-head">Ordered Date</th>
            <th className="table-head">Customer</th>
            <th className="table-head">Status</th>
            <th className="table-head">Studio</th>
            <th className="table-head">Driver</th>
            <th className="table-head">Wash Type</th>
            <th className="table-head">Total</th>
            <th className="table-head">Delivery Date</th>
            <th className="table-head">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <OrderTableRow
                key={order.id}
                order={order}
                index={index}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <tr>
              <td colSpan={11} className="py-8 text-center text-gray-500">
                No orders found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTableContent;

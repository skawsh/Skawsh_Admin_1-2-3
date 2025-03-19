
import React from 'react';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Order } from './types';
import { useNavigate } from 'react-router-dom';

interface OrderTableRowProps {
  order: Order;
  index: number;
  formatDate: (dateString: string | null) => string;
  formatCurrency: (amount: number) => string;
  onViewDetails: (orderId: string) => void;
}

const OrderTableRow = ({ 
  order, 
  index, 
  formatDate, 
  formatCurrency, 
  onViewDetails 
}: OrderTableRowProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navigate to the order details page
    navigate(`/order/${order.id}`);
    // Also call the original handler if needed
    onViewDetails(order.id);
  };

  return (
    <tr 
      className={cn(
        "hover:bg-gray-50 transition-colors",
        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
      )}
    >
      <td className="table-cell text-center">{index + 1}</td>
      <td className="table-cell font-medium">{order.id}</td>
      <td className="table-cell">{formatDate(order.orderDate)}</td>
      <td className="table-cell">{order.customer}</td>
      <td className="table-cell"><StatusBadge status={order.status} /></td>
      <td className="table-cell">{order.studio}</td>
      <td className="table-cell">
        <span className={cn(
          "px-2 py-1 rounded-md text-xs font-medium",
          order.washType === 'standard' ? "bg-blue-100 text-blue-800" :
          order.washType === 'express' ? "bg-orange-100 text-orange-800" :
          "bg-purple-100 text-purple-800"
        )}>
          {order.washType.charAt(0).toUpperCase() + order.washType.slice(1)}
        </span>
      </td>
      <td className="table-cell font-medium">{formatCurrency(order.total)}</td>
      <td className="table-cell">{order.status === 'delivered' ? formatDate(order.deliveryDate) : 'N/A'}</td>
      <td className="table-cell">{order.driver}</td>
      <td className="table-cell">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewDetails}
          className="flex items-center gap-1 text-laundry-blue hover:text-laundry-blue-dark hover:bg-blue-50 border-gray-200"
        >
          <Eye size={14} />
          View Details
        </Button>
      </td>
    </tr>
  );
};

export default OrderTableRow;

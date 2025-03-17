
import React from 'react';
import { Package, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import StatusBadge from './StatusBadge';

interface OrderTableData {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  phone: string;
  customerAddress: string;
  studioAddress: string;
  studio: string;
  washType: string;
  distance: string;
  status?: string; // Add status field to show order status
}

interface OrdersAssignmentTableProps {
  title: string;
  icon: React.ReactNode;
  statusText: React.ReactNode;
  orders: OrderTableData[];
  selectedOrders: string[];
  onToggleOrderSelection: (orderId: string) => void;
  onSelectAll: () => void;
  onAssignSingle: (orderId: string) => void;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
  showStatus?: boolean; // Default prop to conditionally show status column
}

export const OrdersAssignmentTable: React.FC<OrdersAssignmentTableProps> = ({
  title,
  icon,
  statusText,
  orders,
  selectedOrders,
  onToggleOrderSelection,
  onSelectAll,
  onAssignSingle,
  searchQuery = '',
  onSearchChange,
  showSearch = false,
  showStatus = true // Changed default to true to show status in all tables
}) => {
  return (
    <div className="bg-white rounded-md p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          {statusText}
        </div>
      </div>
      
      {showSearch && onSearchChange && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 w-full"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      )}
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedOrders.length > 0 && orders.every(order => selectedOrders.includes(order.id))}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              {showStatus && <TableHead>Status</TableHead>}
              <TableHead>Phone</TableHead>
              <TableHead>Customer Address</TableHead>
              <TableHead>Studio</TableHead>
              <TableHead>Studio Address</TableHead>
              <TableHead>Wash Type</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => onToggleOrderSelection(order.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  {showStatus && (
                    <TableCell>
                      {order.status && <StatusBadge status={order.status as any} />}
                    </TableCell>
                  )}
                  <TableCell>{order.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={order.customerAddress}>{order.customerAddress}</TableCell>
                  <TableCell>{order.studio}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={order.studioAddress}>{order.studioAddress}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 h-6 w-6 rounded-md flex items-center justify-center">
                        <Package size={14} className="text-blue-600" />
                      </div>
                      {order.washType}
                    </div>
                  </TableCell>
                  <TableCell>{order.distance}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      className="bg-white hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
                      onClick={() => onAssignSingle(order.id)}
                    >
                      <UserPlus size={16} />
                      Assign
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={showStatus ? 13 : 12} className="text-center py-10 text-gray-500">
                  No orders found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Filter, Search, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Order status types
type OrderStatus = 'pending' | 'in-progress' | 'in-delivery' | 'completed' | 'cancelled';

// Sample order data structure
interface Order {
  id: string;
  orderDate: string;
  customer: string;
  status: OrderStatus;
  studio: string;
  driver: string;
  total: number;
  deliveryDate: string | null;
}

interface OrdersTableProps {
  className?: string;
}

// Sample data for the table
const sampleOrders: Order[] = [
  {
    id: 'ORD-0001',
    orderDate: '2023-03-12',
    customer: 'John Smith',
    status: 'completed',
    studio: 'Downtown Studio',
    driver: 'Michael Davis',
    total: 45.99,
    deliveryDate: '2023-03-14',
  },
  {
    id: 'ORD-0002',
    orderDate: '2023-03-13',
    customer: 'Emma Johnson',
    status: 'in-progress',
    studio: 'Westside Studio',
    driver: 'Sarah Wilson',
    total: 32.50,
    deliveryDate: null,
  },
  {
    id: 'ORD-0003',
    orderDate: '2023-03-13',
    customer: 'James Brown',
    status: 'in-delivery',
    studio: 'Eastside Studio',
    driver: 'Robert Miller',
    total: 78.25,
    deliveryDate: null,
  },
  {
    id: 'ORD-0004',
    orderDate: '2023-03-14',
    customer: 'Olivia Davis',
    status: 'pending',
    studio: 'Downtown Studio',
    driver: 'Unassigned',
    total: 54.75,
    deliveryDate: null,
  },
  {
    id: 'ORD-0005',
    orderDate: '2023-03-11',
    customer: 'William Taylor',
    status: 'cancelled',
    studio: 'Northside Studio',
    driver: 'Cancelled',
    total: 0,
    deliveryDate: null,
  },
];

const OrdersTable = ({ className }: OrdersTableProps) => {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(sampleOrders);
  const [searchQuery, setSearchQuery] = useState('');

  const filterOrders = (tab: 'all' | OrderStatus) => {
    setActiveTab(tab);
    
    if (tab === 'all') {
      setFilteredOrders(
        searchQuery ? 
          sampleOrders.filter(order => 
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase())
          ) : 
          sampleOrders
      );
    } else {
      setFilteredOrders(
        sampleOrders.filter(order => 
          order.status === tab && 
          (searchQuery ? 
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) :
            true
          )
        )
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (activeTab === 'all') {
      setFilteredOrders(
        query ? 
          sampleOrders.filter(order => 
            order.id.toLowerCase().includes(query.toLowerCase()) ||
            order.customer.toLowerCase().includes(query.toLowerCase())
          ) : 
          sampleOrders
      );
    } else {
      setFilteredOrders(
        sampleOrders.filter(order => 
          order.status === activeTab && 
          (query ? 
            order.id.toLowerCase().includes(query.toLowerCase()) ||
            order.customer.toLowerCase().includes(query.toLowerCase()) :
            true
          )
        )
      );
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge status-pending">Pending</span>;
      case 'in-progress':
        return <span className="status-badge status-in-progress">In Progress</span>;
      case 'in-delivery':
        return <span className="status-badge status-in-delivery">In Delivery</span>;
      case 'completed':
        return <span className="status-badge status-completed">Completed</span>;
      case 'cancelled':
        return <span className="status-badge status-cancelled">Cancelled</span>;
      default:
        return null;
    }
  };

  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // This would typically navigate to an order details page
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-md shadow-sm animate-slide-up", className)}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Orders Overview</h2>
      </div>
      
      <div className="px-4 py-2 border-b border-gray-200 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex overflow-x-auto hide-scrollbar space-x-2">
          <button
            onClick={() => filterOrders('all')}
            className={cn("order-tab", activeTab === 'all' ? "active" : "hover:bg-gray-100")}
          >
            All Orders
          </button>
          <button
            onClick={() => filterOrders('pending')}
            className={cn("order-tab", activeTab === 'pending' ? "active" : "hover:bg-gray-100")}
          >
            Pending
          </button>
          <button
            onClick={() => filterOrders('in-progress')}
            className={cn("order-tab", activeTab === 'in-progress' ? "active" : "hover:bg-gray-100")}
          >
            In Progress
          </button>
          <button
            onClick={() => filterOrders('in-delivery')}
            className={cn("order-tab", activeTab === 'in-delivery' ? "active" : "hover:bg-gray-100")}
          >
            In Delivery
          </button>
          <button
            onClick={() => filterOrders('completed')}
            className={cn("order-tab", activeTab === 'completed' ? "active" : "hover:bg-gray-100")}
          >
            Completed
          </button>
          <button
            onClick={() => filterOrders('cancelled')}
            className={cn("order-tab", activeTab === 'cancelled' ? "active" : "hover:bg-gray-100")}
          >
            Cancelled
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-laundry-blue focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <Filter size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="table-head">Order ID</th>
              <th className="table-head">Ordered Date</th>
              <th className="table-head">Customer</th>
              <th className="table-head">Status</th>
              <th className="table-head">Studio</th>
              <th className="table-head">Driver</th>
              <th className="table-head">Total</th>
              <th className="table-head">Delivered Date</th>
              <th className="table-head">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr 
                  key={order.id} 
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  )}
                >
                  <td className="table-cell font-medium">{order.id}</td>
                  <td className="table-cell">{formatDate(order.orderDate)}</td>
                  <td className="table-cell">{order.customer}</td>
                  <td className="table-cell">{getStatusBadge(order.status)}</td>
                  <td className="table-cell">{order.studio}</td>
                  <td className="table-cell">{order.driver}</td>
                  <td className="table-cell font-medium">{formatCurrency(order.total)}</td>
                  <td className="table-cell">{formatDate(order.deliveryDate)}</td>
                  <td className="table-cell">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order.id)}
                      className="flex items-center gap-1 text-laundry-blue hover:text-laundry-blue-dark hover:bg-blue-50 border-gray-200"
                    >
                      <Eye size={14} />
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  No orders found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;

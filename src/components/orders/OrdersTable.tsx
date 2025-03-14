import React, { useState } from 'react';
import { Filter, Search, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Order status types - updated to match the new statuses
type OrderStatus = 'new' | 'received' | 'in-progress' | 'ready-for-collect' | 'collected' | 'cancelled';

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

// Update sample data with new status types
const sampleOrders: Order[] = [
  {
    id: 'ORD-0001',
    orderDate: '2023-03-12',
    customer: 'John Smith',
    status: 'collected',
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
    status: 'ready-for-collect',
    studio: 'Eastside Studio',
    driver: 'Robert Miller',
    total: 78.25,
    deliveryDate: null,
  },
  {
    id: 'ORD-0004',
    orderDate: '2023-03-14',
    customer: 'Olivia Davis',
    status: 'new',
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
  {
    id: 'ORD-0006',
    orderDate: '2023-03-15',
    customer: 'Sophia Martinez',
    status: 'received',
    studio: 'Downtown Studio',
    driver: 'Pending Assignment',
    total: 29.99,
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
      case "new":
        return <span className="status-badge status-new">New Order</span>;
      case "received":
        return <span className="status-badge status-received">Order Received</span>;
      case "in-progress":
        return <span className="status-badge status-in-progress">In Progress</span>;
      case "ready-for-collect":
        return <span className="status-badge status-ready">Ready for collect</span>;
      case "collected":
        return <span className="status-badge status-collected">Order collected</span>;
      case "cancelled":
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
    <div className={cn("bg-white rounded-md shadow-sm animate-slide-up", className)}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Orders Overview</h2>
        
        {/* Search and Filter section */}
        <div className="flex mb-6 justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <Button variant="outline" className="flex items-center gap-2 ml-4">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Tabs section - improved scroll behavior */}
        <div className="mb-6 w-full overflow-hidden">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => filterOrders(value as 'all' | OrderStatus)}>
            <ScrollArea className="w-full pb-4" orientation="horizontal">
              <TabsList className="bg-gray-100 h-auto p-1 w-max min-w-full inline-flex no-scrollbar">
                <TabsTrigger 
                  value="all" 
                  className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
                >
                  All Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="new" 
                  className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
                >
                  New Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="received" 
                  className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
                >
                  Order Received
                </TabsTrigger>
                <TabsTrigger 
                  value="in-progress" 
                  className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
                >
                  Orders In Progress
                </TabsTrigger>
                <TabsTrigger 
                  value="ready-for-collect" 
                  className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
                >
                  Ready for collect
                </TabsTrigger>
                <TabsTrigger 
                  value="collected" 
                  className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
                >
                  Order collected
                </TabsTrigger>
                <TabsTrigger 
                  value="cancelled" 
                  className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
                >
                  Cancelled
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </Tabs>
        </div>
        
        <div className="mt-6">
          <div className="relative overflow-x-auto mt-4 border border-gray-100 rounded-lg">
            <table className="w-full text-left">
              <thead className="text-xs uppercase bg-gray-50">
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
      </div>
    </div>
  );
};

export default OrdersTable;

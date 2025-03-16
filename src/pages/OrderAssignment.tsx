
import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Clock, Package, ClipboardCheck, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleOrders } from '@/components/orders/mockData';
import { Order } from '@/components/orders/types';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const OrderAssignment = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [washTypeFilter, setWashTypeFilter] = useState('all');

  // Filter orders based on their status
  const newOrders = sampleOrders.filter(order => order.status === 'new' || order.status === 'received');
  const readyForCollectionOrders = sampleOrders.filter(order => order.status === 'ready-for-collect');
  const rescheduledOrders: Order[] = []; // We don't have rescheduled orders in the sample data

  // Convert the sample order data to the format needed for the table
  const mapOrdersToTableData = (orders: Order[]) => {
    return orders.map(order => ({
      id: order.id,
      orderId: order.id,
      date: order.orderDate,
      customer: order.customer,
      phone: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000), // Mock phone number
      address: order.studio + ' Studio, Hyderabad', // Mock address using studio name
      studio: order.studio,
      washType: order.washType === 'express' ? 'Express Wash' : order.washType === 'standard' ? 'Standard Wash' : 'Both Wash',
      priority: Math.random() > 0.5 ? 'High' : 'Low', // Random priority
      distance: (Math.random() * 5 + 1).toFixed(1) + ' km' // Random distance
    }));
  };

  const pendingOrders = mapOrdersToTableData(newOrders);
  const readyOrders = mapOrdersToTableData(readyForCollectionOrders);

  // Apply search and filter to orders
  const filteredPendingOrders = pendingOrders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.studio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWashType = washTypeFilter === 'all' || 
      order.washType.toLowerCase().includes(washTypeFilter.toLowerCase());
    
    return matchesSearch && matchesWashType;
  });

  const toggleOrderSelection = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredPendingOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredPendingOrders.map(order => order.id));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleWashTypeChange = (value: string) => {
    setWashTypeFilter(value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Order Assignment</h1>
          <p className="text-gray-500">Assign drivers to orders and manage order dispatch</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" className="gap-1">
              <ArrowLeft size={18} />
              Back
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={handleSelectAll}
          >
            <CheckSquare size={18} />
            Select Multiple
          </Button>
          
          <Select 
            defaultValue="all" 
            value={washTypeFilter}
            onValueChange={handleWashTypeChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Wash Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wash Types</SelectItem>
              <SelectItem value="standard">Standard Wash</SelectItem>
              <SelectItem value="express">Express Wash</SelectItem>
              <SelectItem value="both">Both Wash</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 w-[250px]"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="new" className="flex items-center gap-2">
            <Package size={16} />
            New Orders
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex items-center gap-2">
            <ClipboardCheck size={16} />
            Ready for Collection
          </TabsTrigger>
          <TabsTrigger value="rescheduled" className="flex items-center gap-2">
            <Clock size={16} />
            Rescheduled
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-4">
          <div className="bg-white rounded-md p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-laundry-blue" />
                <h2 className="text-xl font-semibold">New Order Assignments</h2>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock size={16} />
                <span>{newOrders.length} Orders Pending</span>
              </div>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10 w-full"
                placeholder="Search new orders..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedOrders.length === filteredPendingOrders.length && filteredPendingOrders.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Studio</TableHead>
                    <TableHead>Wash Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Distance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPendingOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.phone}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>{order.studio}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 h-6 w-6 rounded-md flex items-center justify-center">
                            <Package size={14} className="text-blue-600" />
                          </div>
                          {order.washType}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.priority}
                        </span>
                      </TableCell>
                      <TableCell>{order.distance}</TableCell>
                    </TableRow>
                  ))}
                  {filteredPendingOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-10 text-gray-500">
                        No orders found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ready">
          {readyOrders.length > 0 ? (
            <div className="bg-white rounded-md p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ClipboardCheck size={20} className="text-green-600" />
                  <h2 className="text-xl font-semibold">Ready for Collection</h2>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={16} />
                  <span>{readyOrders.length} Orders Ready</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Studio</TableHead>
                      <TableHead>Wash Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Distance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {readyOrders.map((order, index) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.phone}</TableCell>
                        <TableCell>{order.address}</TableCell>
                        <TableCell>{order.studio}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 h-6 w-6 rounded-md flex items-center justify-center">
                              <Package size={14} className="text-blue-600" />
                            </div>
                            {order.washType}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.priority === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.priority}
                          </span>
                        </TableCell>
                        <TableCell>{order.distance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-md p-6 border border-gray-100 flex items-center justify-center text-gray-500 h-64">
              No orders ready for collection
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rescheduled">
          <div className="bg-white rounded-md p-6 border border-gray-100 flex items-center justify-center text-gray-500 h-64">
            No rescheduled orders
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderAssignment;

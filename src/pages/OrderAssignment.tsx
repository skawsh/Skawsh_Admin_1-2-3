
import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Clock, Package, ClipboardCheck, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrderAssignment = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const pendingOrders = [
    {
      id: '1',
      orderId: 'ORD-10014',
      date: '9/8/2024',
      customer: 'Ankit Sharma',
      phone: '+91 8877665544',
      address: '7-1-397, Ameerpet Main Road, Hyderabad',
      studio: 'Wash & Go',
      washType: 'Quick Wash',
      priority: 'High',
      distance: '2.8 km'
    },
    {
      id: '2',
      orderId: 'ORD-10017',
      date: '2/23/2023',
      customer: 'Ankit Sharma',
      phone: '+91 7766554433',
      address: '10-3-156, Paradise Circle, Secunderabad, Hyderabad',
      studio: 'City Laundry',
      washType: 'Quick Wash',
      priority: 'Low',
      distance: '2.5 km'
    }
  ];

  const toggleOrderSelection = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === pendingOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(pendingOrders.map(order => order.id));
    }
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
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Wash Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wash Types</SelectItem>
              <SelectItem value="standard">Standard Wash</SelectItem>
              <SelectItem value="express">Express Wash</SelectItem>
              <SelectItem value="quickwash">Quick Wash</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 w-[250px]"
              placeholder="Search orders..."
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
            Ready for Pickup
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
                <span>10 Orders Pending</span>
              </div>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10 w-full"
                placeholder="Search new orders..."
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">
                      <Checkbox
                        checked={selectedOrders.length === pendingOrders.length && pendingOrders.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Address</th>
                    <th className="px-4 py-3">Studio</th>
                    <th className="px-4 py-3">Wash Type</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Distance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingOrders.map((order, index) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{order.orderId}</td>
                      <td className="px-4 py-3">{order.date}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.phone}</td>
                      <td className="px-4 py-3">{order.address}</td>
                      <td className="px-4 py-3">{order.studio}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 h-6 w-6 rounded-md flex items-center justify-center">
                            <Package size={14} className="text-blue-600" />
                          </div>
                          {order.washType}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">{order.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ready">
          <div className="bg-white rounded-md p-6 border border-gray-100 flex items-center justify-center text-gray-500 h-64">
            No orders ready for pickup
          </div>
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

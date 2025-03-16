
import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Clock, Package, ClipboardCheck, Search, UserPlus } from 'lucide-react';
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
import { AssignDriverDialog } from '@/components/orders/AssignDriverDialog';
import { toast } from "sonner";

const OrderAssignment = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [washTypeFilter, setWashTypeFilter] = useState('all');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [currentOrderToAssign, setCurrentOrderToAssign] = useState<string | null>(null);

  const newOrders = sampleOrders.filter(order => order.status === 'new' || order.status === 'received');
  const readyForCollectionOrders = sampleOrders.filter(order => order.status === 'ready-for-collect');

  const mapOrdersToTableData = (orders: Order[]) => {
    return orders.map(order => ({
      id: order.id,
      orderId: order.id,
      date: order.orderDate,
      customer: order.customer,
      phone: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
      customerAddress: generateRandomAddress(),
      studioAddress: order.studio + ' Studio, Hyderabad',
      studio: order.studio,
      washType: order.washType === 'express' ? 'Express Wash' : order.washType === 'standard' ? 'Standard Wash' : 'Both Wash',
      distance: (Math.random() * 5 + 1).toFixed(1) + ' km'
    }));
  };

  const generateRandomAddress = () => {
    const plots = ['7-1-397', '8-2-120', '9-3-456', '10-4-789', '11-5-234'];
    const areas = ['Ameerpet', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Gachibowli'];
    const roads = ['Main Road', 'Circle Road', 'Junction Street', 'Cross Road', 'Highway'];
    
    return `${plots[Math.floor(Math.random() * plots.length)]}, ${areas[Math.floor(Math.random() * areas.length)]}, ${roads[Math.floor(Math.random() * roads.length)]}, Hyderabad`;
  };

  const pendingOrders = mapOrdersToTableData(newOrders);
  const readyOrders = mapOrdersToTableData(readyForCollectionOrders);

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

  const handleAssignSelected = () => {
    setCurrentOrderToAssign(null);
    setIsAssignDialogOpen(true);
  };

  const handleAssignSingle = (orderId: string) => {
    setSelectedOrders([orderId]);
    setCurrentOrderToAssign(orderId);
    setIsAssignDialogOpen(true);
  };

  const handleAssignDriver = (driverId: string, orderIds: string[]) => {
    // In a real application, this would make an API call
    console.log('Assigning driver:', driverId, 'to orders:', orderIds);
    
    // Show success message
    const orderText = orderIds.length === 1 ? 'order' : 'orders';
    toast.success(`Successfully assigned driver to ${orderIds.length} ${orderText}`);
    
    // Clear selection after assignment
    setSelectedOrders([]);
  };

  const getSelectedOrdersData = () => {
    if (currentOrderToAssign) {
      const order = [...pendingOrders, ...readyOrders].find(o => o.id === currentOrderToAssign);
      return order ? [order] : [];
    }
    
    return [...pendingOrders, ...readyOrders].filter(order => 
      selectedOrders.includes(order.id)
    );
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
          
          {selectedOrders.length > 0 && (
            <Button 
              className="gap-2 bg-primary text-white"
              onClick={handleAssignSelected}
            >
              <UserPlus size={18} />
              Assign Selected ({selectedOrders.length})
            </Button>
          )}
          
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
                    <TableHead>Customer Address</TableHead>
                    <TableHead>Studio</TableHead>
                    <TableHead>Studio Address</TableHead>
                    <TableHead>Wash Type</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Action</TableHead>
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
                      <TableCell>{order.customerAddress}</TableCell>
                      <TableCell>{order.studio}</TableCell>
                      <TableCell>{order.studioAddress}</TableCell>
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
                          className="bg-white hover:bg-gray-50 flex items-center gap-2"
                          onClick={() => handleAssignSingle(order.id)}
                        >
                          <UserPlus size={16} />
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPendingOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-10 text-gray-500">
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
                  <span>{readyForCollectionOrders.length} Orders Ready</span>
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
                      <TableHead>Customer Address</TableHead>
                      <TableHead>Studio</TableHead>
                      <TableHead>Studio Address</TableHead>
                      <TableHead>Wash Type</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {readyOrders.map((order, index) => (
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
                        <TableCell>{order.customerAddress}</TableCell>
                        <TableCell>{order.studio}</TableCell>
                        <TableCell>{order.studioAddress}</TableCell>
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
                            className="bg-white hover:bg-gray-50 flex items-center gap-2"
                            onClick={() => handleAssignSingle(order.id)}
                          >
                            <UserPlus size={16} />
                            Assign
                          </Button>
                        </TableCell>
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

      <AssignDriverDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        selectedOrders={getSelectedOrdersData()}
        onAssignDriver={handleAssignDriver}
      />
    </div>
  );
};

export default OrderAssignment;

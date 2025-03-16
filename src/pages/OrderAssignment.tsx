
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

const studioAddressMapping: Record<string, string> = {
  'PKC Laundries': '7-1-397, Jubilee Hills, Main Road, Hyderabad',
  'MagicKlean': '8-2-120, Banjara Hills, Circle Road, Hyderabad',
  'Cleanovo': '9-3-456, Ameerpet, Junction Street, Hyderabad',
  'UClean': '10-4-789, Madhapur, Cross Road, Hyderabad',
  'Tumbledry': '11-5-234, Gachibowli, Highway, Hyderabad',
  'Washmart': '12-6-567, HITEC City, Main Road, Hyderabad',
  'We Washh': '13-7-890, Kondapur, Circle Road, Hyderabad',
  'The Laundry Basket': '14-8-123, Kukatpally, Junction Street, Hyderabad',
  'FABO': '15-9-456, Secunderabad, Cross Road, Hyderabad',
  'Sunshine': '16-10-789, Miyapur, Highway, Hyderabad',
  'Bhavani BAND BOX': '17-11-012, Begumpet, Main Road, Hyderabad',
  'Balus Modern': '18-12-345, Manikonda, Circle Road, Hyderabad'
};

const calculateDistance = (source: string, destination: string): string => {
  const sourceCode = source.charCodeAt(0) + source.charCodeAt(source.length - 1);
  const destCode = destination.charCodeAt(0) + destination.charCodeAt(destination.length - 1);
  
  const distance = ((sourceCode + destCode) % 140) / 10 + 1;
  
  return distance.toFixed(1) + ' km';
};

const OrderAssignment = () => {
  const [selectedNewOrders, setSelectedNewOrders] = useState<string[]>([]);
  const [selectedReadyOrders, setSelectedReadyOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [washTypeFilter, setWashTypeFilter] = useState('all');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [currentOrderToAssign, setCurrentOrderToAssign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('new');

  const selectedOrders = [...selectedNewOrders, ...selectedReadyOrders];

  const newOrders = sampleOrders.filter(order => order.status === 'new' || order.status === 'received');
  const readyForCollectionOrders = sampleOrders.filter(order => order.status === 'ready-for-collect');

  const generateRandomAddress = () => {
    const plots = ['7-1-397', '8-2-120', '9-3-456', '10-4-789', '11-5-234'];
    const areas = ['Ameerpet', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Gachibowli'];
    const roads = ['Main Road', 'Circle Road', 'Junction Street', 'Cross Road', 'Highway'];
    
    return `${plots[Math.floor(Math.random() * plots.length)]}, ${areas[Math.floor(Math.random() * areas.length)]}, ${roads[Math.floor(Math.random() * roads.length)]}, Hyderabad`;
  };

  const mapOrdersToTableData = (orders: Order[]) => {
    return orders.map(order => {
      const customerAddress = generateRandomAddress();
      const studioAddress = studioAddressMapping[order.studio] || `${order.studio} Studio, Hyderabad`;
      
      return {
        id: order.id,
        orderId: order.id,
        date: order.orderDate,
        customer: order.customer,
        phone: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
        customerAddress: customerAddress,
        studioAddress: studioAddress,
        studio: order.studio,
        washType: order.washType === 'express' ? 'Express Wash' : order.washType === 'standard' ? 'Standard Wash' : 'Both Wash',
        distance: calculateDistance(customerAddress, studioAddress)
      };
    });
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
    const isNewOrder = pendingOrders.some(order => order.id === orderId);
    const isReadyOrder = readyOrders.some(order => order.id === orderId);
    
    if (isNewOrder) {
      if (selectedNewOrders.includes(orderId)) {
        setSelectedNewOrders(selectedNewOrders.filter(id => id !== orderId));
      } else {
        setSelectedNewOrders([...selectedNewOrders, orderId]);
      }
    } else if (isReadyOrder) {
      if (selectedReadyOrders.includes(orderId)) {
        setSelectedReadyOrders(selectedReadyOrders.filter(id => id !== orderId));
      } else {
        setSelectedReadyOrders([...selectedReadyOrders, orderId]);
      }
    }
  };

  const handleSelectAll = () => {
    if (activeTab === 'new') {
      if (selectedNewOrders.length === filteredPendingOrders.length) {
        setSelectedNewOrders([]);
      } else {
        setSelectedNewOrders(filteredPendingOrders.map(order => order.id));
      }
    } else if (activeTab === 'ready') {
      if (selectedReadyOrders.length === readyOrders.length) {
        setSelectedReadyOrders([]);
      } else {
        setSelectedReadyOrders(readyOrders.map(order => order.id));
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleWashTypeChange = (value: string) => {
    setWashTypeFilter(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAssignSelected = () => {
    setCurrentOrderToAssign(null);
    setIsAssignDialogOpen(true);
  };

  const handleAssignSingle = (orderId: string) => {
    setSelectedNewOrders([]);
    setSelectedReadyOrders([]);
    
    if (pendingOrders.some(order => order.id === orderId)) {
      setSelectedNewOrders([orderId]);
    } else if (readyOrders.some(order => order.id === orderId)) {
      setSelectedReadyOrders([orderId]);
    }
    
    setCurrentOrderToAssign(orderId);
    setIsAssignDialogOpen(true);
  };

  const handleAssignDriver = (driverId: string, orderIds: string[]) => {
    console.log('Assigning driver:', driverId, 'to orders:', orderIds);
    
    const orderText = orderIds.length === 1 ? 'order' : 'orders';
    toast.success(`Successfully assigned driver to ${orderIds.length} ${orderText}`);
    
    setSelectedNewOrders([]);
    setSelectedReadyOrders([]);
  };

  const getSelectedOrdersData = () => {
    if (currentOrderToAssign) {
      const order = [...pendingOrders, ...readyOrders].find(o => o.id === currentOrderToAssign);
      return order ? [order] : [];
    }
    
    const selectedNewOrdersData = pendingOrders.filter(order => 
      selectedNewOrders.includes(order.id)
    );
    
    const selectedReadyOrdersData = readyOrders.filter(order => 
      selectedReadyOrders.includes(order.id)
    );
    
    return {
      newOrders: selectedNewOrdersData,
      readyOrders: selectedReadyOrdersData
    };
  };

  const isOrderFromReadyTab = (orderId: string) => {
    return readyOrders.some(order => order.id === orderId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header section with fixed layout */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Back button area - fixed width */}
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
              <ArrowLeft size={20} />
            </Button>
          </Link>
        </div>
        
        {/* Title area - takes remaining space */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Order Assignment</h1>
          <p className="text-gray-500">Assign drivers to orders and manage order dispatch</p>
        </div>
        
        {/* Controls area - fixed width with internal flex layout */}
        <div className="flex items-center gap-4 justify-end">
          <Button 
            variant="outline" 
            className="gap-1 whitespace-nowrap"
            onClick={handleSelectAll}
          >
            <CheckSquare size={18} />
            Select Multiple
          </Button>
          
          {selectedOrders.length > 0 && (
            <Button 
              className="gap-2 bg-primary text-white whitespace-nowrap"
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
      
      {/* Tabs section */}
      <Tabs 
        defaultValue="new" 
        className="w-full"
        value={activeTab}
        onValueChange={handleTabChange}
      >
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
                        checked={selectedNewOrders.length > 0 && filteredPendingOrders.every(order => selectedNewOrders.includes(order.id))}
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
                          checked={selectedNewOrders.includes(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
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
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedReadyOrders.length > 0 && readyOrders.every(order => selectedReadyOrders.includes(order.id))}
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
                    {readyOrders.map((order, index) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={selectedReadyOrders.includes(order.id)}
                            onCheckedChange={() => toggleOrderSelection(order.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
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

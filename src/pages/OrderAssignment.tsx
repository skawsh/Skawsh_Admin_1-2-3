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
  const [activeTab, setActiveTab] = useState("new");

  const newOrders = sampleOrders.filter(order => order.status === 'new' || order.status === 'received');
  const readyForCollectionOrders = sampleOrders.filter(order => order.status === 'ready-for-collect');

  const mapOrdersToTableData = (orders: Order[], isReadyForCollection: boolean = false) => {
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
      distance: (Math.random() * 5 + 1).toFixed(1) + ' km',
      isReadyForCollection: isReadyForCollection
    }));
  };

  const generateRandomAddress = () => {
    const plots = ['7-1-397', '8-2-120', '9-3-456', '10-4-789', '11-5-234'];
    const areas = ['Ameerpet', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Gachibowli'];
    const roads = ['Main Road', 'Circle Road', 'Junction Street', 'Cross Road', 'Highway'];
    
    return `${plots[Math.floor(Math.random() * plots.length)]}, ${areas[Math.floor(Math.random() * areas.length)]}, ${roads[Math.floor(Math.random() * roads.length)]}, Hyderabad`;
  };

  const pendingOrders = mapOrdersToTableData(newOrders);
  const readyOrders = mapOrdersToTableData(readyForCollectionOrders, true);

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
    console.log('Assigning driver:', driverId, 'to orders:', orderIds);
    const orderText = orderIds.length === 1 ? 'order' : 'orders';
    toast.success(`Successfully assigned driver to ${orderIds.length} ${orderText}`);
    setSelectedOrders([]);
  };

  const getSelectedOrdersData = () => {
    if (currentOrderToAssign) {
      const orderArrays = activeTab === "ready" ? readyOrders : pendingOrders;
      const order = orderArrays.find(o => o.id === currentOrderToAssign);
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
      
      <Tabs 
        defaultValue="new" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}


